'use client'

import { useState, useRef } from 'react'
import { useTheme } from "@/context/ThemeProvider"
import Button from './Button'
import ReCAPTCHA from 'react-google-recaptcha'
import { Contact } from './IconLibrary'
import { contactFormSchema, type ContactApiResponse } from '@/lib/contact/schema'
import { envPublic } from '@/lib/env.public'

type FormState = {
    name: string;
    email: string;
    message: string;
    recaptcha: string;
}

type StatusType = 'idle' | 'sending' | 'success' | 'error'

function logicSubmitButton(a: StatusType) {
    if (a === 'sending') return 'Sending...'
    if (a === 'success') return 'Sent !'
    if (a === 'error') return 'Please check your input and try again.'
    return 'Send Message'
}

const RECAPTCHA_SITE_KEY = envPublic.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

const wrapperStyles = "flex flex-col gap-2"

const ContactForm = ({ styles = "" }: { styles?: string }) => {
    const [form, setForm] = useState<FormState>({ name: '', email: '', message: '', recaptcha: '' })
    const [status, setStatus] = useState<StatusType>('idle')
    const [feedback, setFeedback] = useState<string>('')
    const recaptchaRef = useRef<ReCAPTCHA>(null)
    const { theme } = useTheme()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleRecaptcha = (token: string | null) => {
        setForm((prev) => ({ ...prev, recaptcha: token || '' }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFeedback('')

        const parsed = contactFormSchema.safeParse(form)
        if (!parsed.success) {
            setStatus('error')
            setFeedback(parsed.error.issues[0]?.message ?? 'Invalid input.')
            return
        }

        setStatus('sending')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parsed.data),
            })
            const data = (await res.json()) as ContactApiResponse

            if (!res.ok || !data.success) {
                setStatus('error')
                setFeedback(data.message || 'Something went wrong. Please try again.')
                return
            }

            setStatus('success')
            setFeedback(data.message)
            setForm({ name: '', email: '', message: '', recaptcha: '' })
            recaptchaRef.current?.reset()
        } catch {
            setStatus('error')
            setFeedback('Connection issue detected. Please try again shortly.')
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-6 w-full ${styles}`}
            aria-label="Contact form"
            role="form"
            autoComplete="on"
        >
            <div className={wrapperStyles}>
                <label className="tag" htmlFor="contact-name">Full Name</label>
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
            </div>
            <div className={wrapperStyles}>
                <label className="tag" htmlFor="contact-email">Your Email</label>
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
            </div>
            <div className={wrapperStyles}>
                <label className="tag" htmlFor="contact-message">Your Message</label>
                <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about your needs (minimum 50 characters)..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    aria-label="Your message"
                    aria-required="true"
                />
                <small className="text-(--gray)">Message must be between 50 and 500 characters.</small>
            </div>
            {/* --- reCAPTCHA --- */}
            <div className="flex justify-start mt-4">
                <ReCAPTCHA
                    key={theme}
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    theme={theme}
                    onChange={handleRecaptcha}
                />
            </div>
            {feedback ? (
                <p
                    className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}
                    aria-live="polite"
                >
                    {feedback}
                </p>
            ) : null}
            <Button
                title={logicSubmitButton(status)}
                additionalHoverLogic={status === "sending" || status === "success"}
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                styles={`
                    relative bg-(--white) w-full px-6 h-12 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
                    [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]`}
                aria-label={logicSubmitButton(status)}
                aria-live="polite"
                icon={Contact}
            />
        </form>
    )
}

export default ContactForm