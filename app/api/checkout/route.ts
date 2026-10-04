import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
      apiVersion: '2026-09-30.endive',
    });

    const body = await req.json();
    const { name, email, phone } = body;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      customer_email: email, // Pre-fill email
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'WA Automation Setup',
              description: `Instant Access - 30 Minute Setup`,
            },
            unit_amount: 900, // $9.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
      metadata: {
        customer_name: name,
        customer_phone: phone,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
