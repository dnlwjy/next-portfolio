'use client'

import { useState } from 'react'
import Button from './Button'

type FormState = {
    name: string;
    email: string;
    message: string;
}

type StatusType = 'idle' | 'sending' | 'success' | 'error'

function buttonLogic(a: StatusType) {
    if (a === 'sending') return 'Sending...'
    if (a === 'success') return 'Sent !'
    if (a === 'error') return 'Something went wrong. Please try again.'
    return 'Send Message'
}

const ContactForm = ({ styles = "" }: { styles?: string }) => {
    const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
    const [status, setStatus] = useState<StatusType>('idle')
    const [buttonHover, setButtonHover] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            if (!res.ok) throw new Error()

            setStatus('success')
            setForm({ name: '', email: '', message: '' })
        } catch {
            setStatus('error')
        }
    }

    const wrapperStyles = "flex flex-col gap-2"

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-6 w-full ${styles}`}
            aria-label="Contact form"
            role="form"
            autoComplete="on"
        >
            <label className={wrapperStyles} htmlFor="contact-name">
                <p className="tag">Full Name</p>
                <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoFocus
                    aria-label="Full Name"
                    aria-required="true"
                    autoComplete="name"
                />
            </label>
            <label className={wrapperStyles} htmlFor="contact-email">
                <p className="tag">Your Email</p>
                <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="johndoe@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    aria-label="Email address"
                    aria-required="true"
                    autoComplete="email"
                />
            </label>
            <label className={wrapperStyles} htmlFor="contact-message">
                <p className="tag">Your Message</p>
                <textarea
                    id="contact-message"
                    name="message"
                    placeholder="I want to talk about..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    aria-label="Your message"
                    aria-required="true"
                />
            </label>
            <Button
                title={buttonLogic(status)}
                additionalHoverLogic={status === "sending" || status === "success"}
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
                styles={`
                    relative bg-(--white) w-full px-6 h-12 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
                    [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]`}
                aria-label={buttonLogic(status)}
                aria-live="polite"
            />
        </form>
    )
}

export default ContactForm