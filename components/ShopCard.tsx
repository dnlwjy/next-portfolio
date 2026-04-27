'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { m } from 'framer-motion'
import { logicPricing } from '../lib/logicPricing'

interface ShopCardProps {
    title: any;
    image: any;
    link: any;
    price: any;
    styles?: string
}

const ShopCard = ({
    title,
    image,
    link,
    price,
    styles = ""
}: ShopCardProps) => {
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
                    // let urlFor handle the optimization
                    unoptimized
                    className="object-contain"
                />
            </m.div>
        </div>

        <div className="p-3 sm:p-4 lg:p-5 flex justify-between items-end gap-2">
            <p className="tag line-clamp-2">{title}</p>
            <p className="tag">{logicPricing(price)}</p>
        </div>
    </Link>
)}

export default ShopCard