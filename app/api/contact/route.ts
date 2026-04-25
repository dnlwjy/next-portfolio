import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    // 1. Parse body
    const { name, email, message, recaptcha } = await request.json()

    // 2. Validasi field dulu
    if (!name || !email || !message || !recaptcha) {
        return NextResponse.json(
            { error: 'All fields are required' },
            { status: 400 }
        )
    }

    // 3. Verifikasi reCAPTCHA ke Google
    try {
        const verify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            body: new URLSearchParams({
                secret: process.env.RECAPTCHA_SECRET_KEY!,
                response: recaptcha,
            }),
        })

        const { success } = await verify.json()

        if (!success) {
            return NextResponse.json(
                { error: 'reCAPTCHA verification failed' },
                { status: 400 }
            )
        }
    } catch {
        return NextResponse.json(
            { error: 'Failed to verify reCAPTCHA. Please try again.' },
            { status: 500 }
        )
    }

    // 4. Proses form (kirim email / simpan ke DB)
    try {
        // TODO: tambahkan logika pengiriman email atau simpan ke database di sini
        console.log('Contact form submission:', { name, email, message })

        return NextResponse.json({ success: true }, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: 'Failed to process your message. Please try again.' },
            { status: 500 }
        )
    }
}