'use client'

import { m, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface FaqAccordionProps {
    Q: string;
    A: string;
    styles?: string;
}

const line = "absolute w-4 h-px transform-gpu will-change-transform [backface-visibility:hidden]"
const padding = "px-6 sm:px-8 py-2"

const FaqAccordion = ({
    Q,
    A,
    styles = ""
}: FaqAccordionProps) => {
    const [open, setOpen] = useState(false)

    return (
        <button
            className={`flex flex-col border border-(--divider) py-4 cursor-pointer ${styles}`}
            onClick={() => setOpen(!open)}
        >
                <m.div className={`flex gap-6 items-center justify-between ${padding}`}>
                    <h3 className="text-start text-(--white) max-w-250">{Q}</h3>
                    <div className="w-4 h-4 flex items-center justify-center">
                        <m.span
                            className={`${line} rotate-90 bg-(--white)`}
                            animate={{ rotate: open ? 45 : 0 }}
                        />
                        <m.span
                            className={`${line} bg-(--white)`}
                            animate={{ rotate: open ? 45 : 0 }}
                        />
                    </div>
                </m.div>

                <AnimatePresence>
                    {open && (
                        <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                        >
                            <p className={`sm max-w-250 ${padding}`}>
                                {A}
                            </p>
                        </m.div>
                    )}
                </AnimatePresence>

            </button>
    )
}

export default FaqAccordion