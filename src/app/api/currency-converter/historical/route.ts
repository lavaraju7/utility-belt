import { NextRequest, NextResponse } from 'next/server';

function getDateRange(range: string) {
    const today = new Date();
    const days = {
        '1D': 1,
        '1W': 7,
        '1M': 30,
        '1Y': 365,
    }[range] || 30;

    const dates: string[] = [];
    const rates: number[] = [];

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
    }

    return { dates, days };
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const range = searchParams.get('range') || '1M';

        if (!from || !to) {
            return NextResponse.json(
                { error: 'From and to currencies are required' },
                { status: 400 }
            );
        }

        const { dates, days } = getDateRange(range);
        const rates: number[] = [];

        // Fetch historical rates for each date
        for (const date of dates) {
            const response = await fetch(
                `https://api.exchangerate-api.com/v4/${date}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch historical rates');
            }

            const data = await response.json();
            const rate = data.rates[to];

            if (!rate) {
                throw new Error('Invalid currency code');
            }

            rates.push(rate);
        }

        return NextResponse.json({ dates, rates });
    } catch (error) {
        console.error('Historical rates error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch historical rates' },
            { status: 500 }
        );
    }
} 