'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { m } from 'framer-motion'

interface ShopCardProps {
    title: string;
    image: string;
    link: string;
    price: number | string;
    styles?: string
}

function pricingLogic(a: any) {
    if (typeof a === "number") {
            if (a > 0) return `$${a}`
            if (a === 0 ) return "FREE"
            if (a < 0 ) throw new Error('gaboleh mines')
    }
    if (typeof a === "string") {
        if (a.toLowerCase() === "free") return "FREE"
        if (a === "0") return "FREE"
    }
    // fallback
    throw new Error('isi yang bener woy');
}

const ShopCard = ({
    title,
    image,
    link,
    price,
    styles = ""
}: ShopCardProps) => {
    console.log("COMP: ShopCard")
    const [hovered, setHovered] = useState(false)

    return (
    <Link
        href={link}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group flex flex-col aspect-3/4 gap-0 border border-(--divider) bg-(--white)/7 hover:bg-(--white)/14 transition-colors duration-300 ${styles}`}
    >
        <div className="flex flex-1 items-center justify-center">
            <m.div
                className="w-[70%] aspect-square relative"
                animate={{ scale: hovered ? 1.1 : 1 }}
            >
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="70vw"
                    className="object-contain"
                />
            </m.div>
        </div>

        <div className="p-3 sm:p-4 lg:p-5 flex justify-between items-end gap-2">
            <p className="tag line-clamp-2">{title}</p>
            <p className="tag">{pricingLogic(price)}</p>
        </div>
    </Link>
)}

export default ShopCard