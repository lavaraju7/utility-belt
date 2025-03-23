import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const from = searchParams.get('from');
        const to = searchParams.get('to');

        if (!from || !to) {
            return NextResponse.json(
                { error: 'From and to currencies are required' },
                { status: 400 }
            );
        }

        // Using Exchange Rates API (you'll need to sign up for a free API key)
        const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${from}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }

        const data = await response.json();
        const rate = data.rates[to];

        if (!rate) {
            return NextResponse.json(
                { error: 'Invalid currency code' },
                { status: 400 }
            );
        }

        return NextResponse.json({ rate });
    } catch (error) {
        console.error('Currency conversion error:', error);
        return NextResponse.json(
            { error: 'Failed to convert currency' },
            { status: 500 }
        );
    }
} 