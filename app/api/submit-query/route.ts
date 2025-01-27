import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
]

// Google Sheets Configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_QUERY_ID
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  console.error('Missing required Google Sheets credentials in environment variables')
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function POST(req: NextRequest) {
  console.log('Received form submission request')
  
  try {
    const body = await req.json()
    console.log('Form data received:', body)

    // Validate the data
    if (!body.name || !body.contact || !body.query) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare the data for Google Sheets
    const values = [[body.name, body.contact, body.query, new Date().toISOString()]];

    // Append data to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:D', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('Successfully added row to sheet')

    return NextResponse.json({ 
      success: true, 
      message: 'Data successfully saved to Google Sheets'
    })

  } catch (error) {
    console.error('Error in submit-form API:', error)
    
    // Detailed error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save data to Google Sheets',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}