import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
        return NextResponse.json(
            { error: 'All fields are required' },
            { status: 400 }
        )
    }

    console.log('Contact form submission:', { name, email, message })

    return NextResponse.json({ success: true })
}
