'use client'

import { useState } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
    variant?: keyof typeof variantButton;
    // for submit button in ContactForm, to keep the hover effect on hold while sending or after success
    additionalHoverLogic?: boolean;
    click?: () => void;
    styles?: string,
}

const variantButton = {
    "primary": {
        base: "bg-(--white)",
        hover: "bg-(--divider)"},
    "secondary": {
        base: "bg-(--black)",
        hover: "bg-(--divider)"},
}

const Button = ({
    title,
    variant = "primary",
    additionalHoverLogic,
    styles,
    click
}: ButtonProps) => {
    const [buttonHover, setButtonHover] = useState(false)

    return (
        <button
            onClick={click}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            className={`
                    relative ${variantButton[variant].base} w-full px-6 h-12 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
                    [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)] ${styles}`}
        >
            <span className={`absolute bottom-0 right-0 ${variantButton[variant].hover} ${buttonHover || additionalHoverLogic ? "w-full h-full rounded-none" : "w-0 h-0 rounded-[100px]"} transition-all duration-600 ease-in-out`} />
            <span className="btn-text text-white mix-blend-difference">{title}</span>
        </button>
    )
}

export default Button