'use client'

import { useState } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
    variant?: keyof typeof variantButton;
    // for submit button in ContactForm, to keep the hover effect on hold while sending or after success
    additionalHoverLogic?: boolean;
    click?: () => void;
    icon?: React.ReactNode;
    styles?: string,
}

const variantButton = {
    "primary": {
        base: "bg-(--white)",
        hover: "bg-(--black)/90"},
    "secondary": {
        base: "bg-(--divider)",
        hover: "bg-(--black)/50"},
}

const Button = ({
    title,
    variant = "primary",
    additionalHoverLogic,
    click,
    icon,
    styles,
}: ButtonProps) => {
    const [buttonHover, setButtonHover] = useState(false)

    return (
        <button
            onClick={click}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            className={`
                    relative ${variantButton[variant].base} flex gap-4 items-center justify-center px-6 h-12 cursor-pointer
                    [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)] ${styles}`}
        >
            <span className={`absolute bottom-0 right-0 ${variantButton[variant].hover} ${buttonHover || additionalHoverLogic ? "w-full h-full rounded-none" : "w-0 h-0 rounded-[100px] rounded-br-none"} transition-all duration-600 ease-in-out`} />
            {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
            <span className="btn-text text-white mix-blend-difference">{title}</span>
        </button>
    )
}

export default Button