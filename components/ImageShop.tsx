'use client'

import { withMagnifier } from "@/lib/withMagnifier"
import Image from "next/image"

interface BaseImageProps {
    image: string
    alt: string
    styles?: string
}

const BaseImage = ({
    image,
    alt,
    styles = "",
}: BaseImageProps) => (
    <Image
        src={image}
        alt={alt}
        fill
        className={`object-contain select-none pointer-events-none ${styles}`}
    />
)

const ImageShop = withMagnifier(BaseImage)

export default ImageShop