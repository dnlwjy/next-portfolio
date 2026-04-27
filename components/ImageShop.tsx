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
    onLoad,
}: BaseImageProps & { onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void }) => (
    <Image
        src={image}
        alt={alt}
        fill
        className={`object-contain select-none ${styles}`}
        sizes="(max-width: 735px) 70vw, 480px"
        // onLoad diteruskan agar memastikan ukuran asli gambar untuk magnifier kalau tidak bisa salah posisi/error
        onLoad={onLoad}
    />
)

const ImageShop = withMagnifier(BaseImage)

export default ImageShop