import { NextRequest, NextResponse } from 'next/server'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
]

// Google Sheets Configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  console.error('Missing required Google Sheets credentials in environment variables')
}

const jwt = new JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: SCOPES,
})

export async function POST(req: NextRequest) {
  console.log('Received form submission request')
  
  try {
    const body = await req.json()
    console.log('Form data received:', body)

    // Initialize the sheet
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt)
    console.log('Connecting to Google Sheets...')
    
    await doc.loadInfo()
    console.log('Connected to sheet:', doc.title)

    // Get the first sheet
    const sheet = doc.sheetsByIndex[0]
    console.log('Accessing sheet:', sheet.title)

    // Add row to sheet
    const addRowResult = await sheet.addRow({
      Timestamp: body.timestamp,
      Name: body.firstname,
      Email: body.email,
      Contact: body.contact,
      Occasion: body.occasion,
      Details: body.details,
      Plan: body.plan,
      Amount: body.amount,
      TransactionID: body.transactionId
    })

    console.log('Add row result:', addRowResult)

    // Check if addRowResult exists and has a rowNumber
    if (!addRowResult) {
      throw new Error('No row was added to the sheet')
    }

    const rowNumber = addRowResult._rowNumber || addRowResult.rowNumber;

    console.log('Successfully added row to sheet, row number:', rowNumber)

    return NextResponse.json({ 
      success: true, 
      message: 'Data successfully saved to Google Sheets',
      rowNumber: rowNumber
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