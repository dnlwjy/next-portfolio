'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from './Button'
import { Chat, Close, Contact } from './IconLibrary'
import { m } from 'framer-motion'

const SUPPORT = "lg:h-14 lg:w-14 h-12 w-12"

export interface ChatbotProps {
  knowledgeBase?: unknown[]
  welcomeMessage?: string
  demoMode?: boolean
  mountChatbot?: boolean
  styles?: string
}

export default function Chatbot({
  welcomeMessage = 'Hi there. This is static chatbot UI preview.',
  knowledgeBase: _knowledgeBase,
  demoMode: _demoMode,
  mountChatbot: _mountChatbot,
  styles = '',
}: ChatbotProps) {
  const [open, setOpen] = useState(false)
  const [mount, setMount] = useState(false)
  const handleToggleChatbot = () => {
    if (!mount) {
      setMount(true)
    }
    setOpen((prev) => !prev)
  }

  const messages = [
    {
      id: 'bot-welcome',
      role: 'assistant',
      content: welcomeMessage,
    },
    {
      id: 'user-question',
      role: 'user',
      content: 'Can you summarize your experience in frontend engineering?',
    },
    {
      id: 'bot-answer',
      role: 'assistant',
      content:
        'Sure. This UI-only mock shows where an assistant response appears. Connect your real chat logic here when ready.',
    },
    {
      id: 'user-questionsss',
      role: 'user',
      content: 'Can you summarize your experience in frontend engineering?',
    },
  ]

  return (
    <div className={`${SUPPORT} ${styles}`}>

      {/* Glow animation with pulse */}
      <span className={`absolute inset-0  ${open ? '' : 'bg-(--white)/70 blur-lg animate-pulse [animation-duration:1s]'} rounded-full transition-all duration-800 pointer-events-none`} />

      <Button
        styles={`${SUPPORT} z-50`}
        icon={open ? Close : Chat}
        afterClickedLogic={open}
        aria-label="Toggle chat widget"
        click={handleToggleChatbot}
      />

      {mount && (
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: open ? 1 : 0,
            y: open ? 0 : 24
          }}
          className={`
            absolute text-[14px] leading-[135%] rounded-tl-2xl bottom-full mb-3 right-0 flex flex-col overflow-hidden bg-(--black) border border-(--white)/10 w-[calc(100dvw-40px)] max-w-85 h-[calc(100dvh-170px)] max-h-140
            ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >

          {/* Messages */}
          <div className="flex-1 min-h-0 overflow-y-auto px-3 py-6 flex flex-col gap-5">
            {messages.map((e) => (
              <div
                key={e.id}
                className={`flex items-start gap-3 ${e.role === 'user' ? 'self-end w-[88%]' : 'self-start w-full'}`}
              >
                {e.role !== 'user' && (
                  <div className="relative shrink-0 -top-1">
                    <Image
                      src="/favicon.png"
                      alt="Chatbot profile"
                      width={24}
                      height={24}
                      className="rounded-full border border-(--divider)"
                    />
                    <span className="absolute right-0 bottom-0 w-2 h-2 translate-x-1/5 translate-y-1/5 rounded-full border border-(--black) bg-(--white) animate-pulse [animation-duration:1s]" />
                  </div>
                )}

                <p
                  className={`p-3 py-2 rounded-lg wrap-break-word ${e.role === 'user'
                    ? 'bg-(--white) text-(--black) rounded-tr-none!'
                    : 'text-(--white) p-0!'
                    }`}
                >
                  {e.content}
                </p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 flex gap-3 items-end">
            <textarea
              className="flex-1"
              placeholder="Type your message..."
              rows={1}
              defaultValue=""
            />
            <Button icon={Contact} aria-label="Send message" type="button" styles="w-11 h-11" />
          </div>
        </m.div>
      )
      }
    </div>
  )
}