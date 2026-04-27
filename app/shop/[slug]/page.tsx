import MotionDiv from "@/components/MotionDiv"
import { client } from "@/sanity/client"
import { PortableText } from '@portabletext/react'
import Serializers from '@/lib/Serializers'
import ShopSupport from "./ShopSupport"
import { urlFor } from "@/sanity/image"
import ImageShop from "@/components/ImageShop"
import { notFound } from "next/navigation"
import ShopList from "@/components/ShopList"

const query = `*[_type == "shop" && slug.current == $slug][0]{
    _id,
    title,
    description,
    category,
    price,
    coverImage,
    images,
    content,
    checkout,
    preview
}`

const moreQuery = `*[_type == \"shop\" && slug.current != $slug]{
    _id,
    title,
    slug,
    tags,
    coverImage,
    category,
    price
}`

// mengubah data jadi SSG - lebih cepat secara performa dan SEO tapi harus redeploy tiap ada perubahan data
export const dynamic = 'force-static'

// Pre-render semua slug dari Sanity saat `npm run build`
export async function generateStaticParams() {
    const slugs: string[] = await client.fetch(`*[_type == "shop"].slug.current`)
    return slugs.map((slug) => ({ slug }))
}

export default async function ShopDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const shopItem = await client.fetch(query, { slug });
    const moreShopItems = await client.fetch(moreQuery, { slug });

    if (!shopItem) {
        notFound();
    }

    return (
        <main>
            <section className="flex-col md:flex-row pt-40 gap-16 max-w-640 min-h-screen">
                <MotionDiv styles="flex flex-col relative justify-center items-center gap-4 md:w-1/3 w-full md:min-w-[520px] max-w-[640px] aspect-square border border-(--divider) bg-(--white)/7">
                    {shopItem.coverImage && (
                        <ImageShop
                            image={urlFor(shopItem.coverImage).width(480).format("webp").url()}
                            alt={shopItem.title}
                        />
                    )}
                </MotionDiv>

                <MotionDiv variant="right" del={0.5} styles="flex flex-col gap-8 flex-1">
                    <div className="flex flex-col gap-4">
                        <h1>{shopItem.title}</h1>
                        <p>{shopItem.description}</p>
                        <p className="text-(--white) text-[24px] md:text-[32px]">
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

            <section id="more-shop-items" className="sm pt-20 gap-40">
                <div className="flex w-18 border-b border-b-(--divider)">
                    <svg width="42" height="5" viewBox="0 0 42 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42 5H0L6.26866 0H35.7313L42 5Z" fill="var(--divider)" />
                    </svg>
                </div>
                <ShopList
                    hideFilters
                    items={moreShopItems.map((e: any) => ({
                        _id: e._id,
                        title: e.title,
                        image: urlFor(e.coverImage).width(320).format("webp").url(),
                        price: e.price,
                        tags: e.tags,
                        category: e.category,
                        link: `/shop/${e.slug.current}`,
                    }))}
                />
            </section>

        </main>
    );
}