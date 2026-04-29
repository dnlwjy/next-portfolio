'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { m } from 'framer-motion'

// all set to 'any' because we just pass the data from sanity directly
interface ItemCardProps {
    title: any;
    image: any;
    link: any;
    styles?: string
}

const ItemCard = ({
    title,
    image,
    link,
    styles = ""
}: ItemCardProps) => {
    const [hovered, setHovered] = useState(false)

    return (
        <Link
            href={link}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`flex aspect-3/4 border border-(--divider) bg-(--white)/7 flex-col gap-0 hover:bg-(--white)/14 transition-colors duration-300 ${styles}`}
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
                        sizes="(max-width: 680px) 35vw, (max-width: 1080px) 25vw, 350px"
                        className="object-contain"
                    />
                </m.div>
            </div>

            <p className="tag line-clamp-2 p-3 sm:p-4 lg:p-5">{title}</p>
        </Link>
    )
}

export default ItemCard