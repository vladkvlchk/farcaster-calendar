import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log('Received Frame Data:', body); // Подивимось, що приходить

        // Отримуємо FID юзера, який відкрив Frame
        const fid = body?.trustedData?.fid;

        if (!fid) {
            return NextResponse.json({ error: 'FID not found' }, { status: 400 });
        }

        return NextResponse.json({ message: 'User info received', fid });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
