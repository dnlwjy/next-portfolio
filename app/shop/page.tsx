import ShopCard from "@/components/ShopCard"
import Tag from '@/components/Tag'
import MotionDiv from "@/components/MotionDiv";
import SearchInput from "@/components/SearchInput";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";

// Pre-render halaman ini saat `npm run build` — navigasi dari Home akan instan
export const dynamic = 'force-static'

interface SanityShopItem {
    _id: string
    title: string
    slug: { current: string }
    coverImage: object
    price: number
}

const query = groq`*[_type == "shop"] | order(orderRank asc) {
    _id,
    title,
    slug,
    coverImage,
    price
}`

export default async function Shop() {
    const items: SanityShopItem[] = await client.fetch(query)
    return (
        <main>
            <section className="flex-col pt-40 gap-16">

                <MotionDiv variant="up" styles="flex flex-col gap-6 items-center w-full">
                    <h1 className="text-center">
                        <span className="text-(--gray)">Welcome to</span>
                        <br />
                        My Shop
                    </h1>

                </MotionDiv>

                <MotionDiv variant="up" del={0.5}>
                    <ul className="flex flex-wrap justify-center gap-2 w-full">
                        <Tag title="All" clickable />
                        <Tag title="Website Templates" clickable />
                        <Tag title="Sheet Music" clickable />
                        <Tag title="Others" clickable />
                    </ul>
                </MotionDiv>

                <MotionDiv variant="up" del={0.7} styles="flex flex-col flex-1 gap-2">
                    <SearchInput />
                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        {items.map((item) => (
                            <ShopCard
                                key={item._id}
                                title={item.title}
                                image={urlFor(item.coverImage).width(600).url()}
                                link={`/shop/${item.slug.current}`}
                                price={item.price}
                            />
                        ))}
                    </div>
                </MotionDiv>

            </section>
        </main>
    )
}