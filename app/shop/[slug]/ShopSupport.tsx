'use client'

import { useState } from "react"
import Button from "../../../components/Button"
import { withScrollLock } from "@/lib/withScrollLock"
import { Close } from '../../../components/IconLibrary'

const CLOSE = <Close size={16} styles="text-white"/>

interface ShopSupportProps {
    checkoutURL: string
    previewURL?: string
}

const shopSupport = ({ checkoutURL, previewURL }: ShopSupportProps) => {
    const [open, setOpen] = useState(false)

    withScrollLock(open)

    return (
        <>
            <div className="flex flex-col w-full gap-2 max-w-200">
                <Button
                    title="Purchase Now"
                    additionalHoverLogic={open}
                    styles="w-full"
                    click={() => setOpen(true)}
                />
                <Button
                    variant="secondary"
                    title="Preview"
                    styles="w-full"
                    click={() => window.open(previewURL, "_blank")}
                />
            </div>

            {/* open overlay */}
            <div
                className={`
                    fixed inset-0 z-50 flex items-center justify-center bg-(--black)/50 backdrop-blur-sm transition-opacity duration-300
                    ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setOpen(false)}
            >
                <div
                    className="relative bg-(--black) border border-(--divider) w-[95%] max-w-lg sm:max-w-2xl h-[80vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <iframe
                        src={checkoutURL}
                        className="w-full h-full"
                        title="Checkout"
                        allow="payment"
                    />
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute cursor-pointer top-4 right-4 text-(--white) rounded-full w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/15 transition-colors duration-300"
                    >
                        {CLOSE}
                    </button>
                </div>

            </div>
        </>
    )
}

export default shopSupport