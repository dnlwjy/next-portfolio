import MotionDiv from "@/components/MotionDiv"
import { client } from "@/sanity/client"
import { PortableText } from '@portabletext/react'
import Serializers from '@/lib/Serializers'
import Tag from '../../../components/Tag'
import ShopSupport from "./ShopSupport"
import { urlFor } from "@/sanity/image"
import ImageShop from "@/components/ImageShop"

const query = `*[_type == "shop" && slug.current == $slug][0]{
    _id,
    title,
    description,
    tags,
    category,
    price,
    coverImage,
    images,
    content,
    checkout,
    preview
}`

// // Paksa halaman ini jadi static — tidak ada server fetch saat runtime
// export const dynamic = 'force-static'

// // Pre-render semua slug dari Sanity saat `npm run build`
// export async function generateStaticParams() {
//     const slugs: string[] = await client.fetch(`*[_type == "shop"].slug.current`)
//     return slugs.map((slug) => ({ slug }))
// }

export default async function ShopDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const shopItem = await client.fetch(query, { slug });

    return (
        <main>
            <section className="flex-col md:flex-row pt-40 gap-16 max-w-640">
                <MotionDiv styles="flex flex-col relative justify-center items-center gap-4 md:w-1/3 w-full md:min-w-[520px] max-w-[640px] aspect-square border border-(--divider) bg-(--white)/7">
                    {shopItem.coverImage && (
                        <ImageShop
                            image={urlFor(shopItem.coverImage).width(800).format("webp").url()}
                            alt={shopItem.title}
                        />
                    )}
                    <Tag title={shopItem.category} styles="absolute top-4 right-4" />
                </MotionDiv>

                <MotionDiv variant="right" del={0.5} styles="flex flex-col gap-8 flex-1">
                    <div className="flex flex-col gap-4">
                        <h1>{shopItem.title}</h1>
                        <p>{shopItem.description}</p>
                        <p className="text-(--white) text-[28px] md:text-[36px]">
                            {shopItem.price === 0 ? 'FREE' : shopItem.price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </p>
                    </div>

                    <ShopSupport checkoutURL={shopItem.checkout} previewURL={shopItem.preview} />
                </MotionDiv>
            </section>

            <section className="sm py-16">
                <MotionDiv variant="up" del={0.5}>
                    <PortableText
                        value={shopItem.content}
                        components={Serializers}
                    />
                </MotionDiv>
            </section>

        </main>
    );
}