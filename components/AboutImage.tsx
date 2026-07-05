'use client'

import Image from 'next/image'
import { useTheme } from "@/context/ThemeProvider"
import D from "@/public/me-dark.webp"
import L from "@/public/me-light.webp"
import { m } from "framer-motion";

const MotionImage = m.create(Image);

const AboutImage = () => {
    const { theme } = useTheme()

    return (
        <MotionImage
            src={theme === "dark" ? D : L}
            alt="Picture of Daniel Wijaya"
            fill
            placeholder="blur"
            sizes="(max-width: 680px) 90vw, 680px"
            className="object-cover"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1, ease: [0.44, 0, 0.56, 1], delay: 0.3 }}
        />
    )
}

export default AboutImage;