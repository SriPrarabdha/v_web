import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      plan,
      contact,
      occasion,
      date,
      time,
      language,
      voiceGender,
      additionalNotes
    } = body;

    // Format date and time
    const formattedDate = new Date(date).toLocaleDateString();
    const currentTimestamp = new Date().toISOString();

    // Prepare row data
    const values = [
      [
        currentTimestamp,
        plan,
        "+91" + contact,
        occasion,
        formattedDate,
        time,
        language,
        voiceGender,
        additionalNotes || 'N/A'
      ]
    ];

    // Append data to Google Sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:I', // Adjust range according to your sheet
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
