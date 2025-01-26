import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { formData } = body

    // Validate input
    if (!formData || !formData.key || !formData.txnid || !formData.amount) {
      console.error('Missing required payment parameters', formData)
      return NextResponse.json({ 
        error: 'Missing required payment parameters' 
      }, { status: 400 })
    }

    const salt = process.env.PAYU_MERCHANT_SALT || 'defaultSalt'
    const merchantKey = process.env.NEXT_PUBLIC_PAYU_MERCHANT_KEY || 'JPM7Fg'

    // Construct hash string
    // sha512(key|txnid|amount|productinfo|firstname|email|||||||||||SALT)
    const hashString = `${merchantKey}|${formData.txnid}|${formData.amount}|${formData.productinfo || 'product'}|${formData.firstname || 'Customer'}|${formData.email || 'customer@gmail.com'}|||||||||||${salt}`

    // Generate hash
    const hash = crypto
      .createHash('sha512')
      .update(hashString)
      .digest('hex')

    console.log('Hash generated successfully', { 
      txnid: formData.txnid, 
      amount: formData.amount 
    })

    return NextResponse.json({ hash })
  } catch (error) {
    console.error('Hash generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate hash' 
    }, { status: 500 })
  }
}