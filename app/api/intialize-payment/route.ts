import payuHostedCheckout from '@api/payu-hosted-checkout'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { formValues, amount } = body

    const paymentResponse = await payuHostedCheckout.payUHostedCheckout({
      accept: 'text/plain',
      amount: amount,
      productinfo: `${formValues.plan} Plan - Customized Song`,
      firstname: formValues.text.split('!!')[0],
      phone: formValues.contact,
      email: 'customer@example.com',
      surl: '/api/payment/success',
      furl: '/api/payment/failure'
    })

    return NextResponse.json(paymentResponse.data)
  } catch (error) {
    console.error('Payment initialization failed:', error)
    return NextResponse.json(
      { error: 'Payment initialization failed' },
      { status: 500 }
    )
  }
}