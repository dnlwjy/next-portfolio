import ShopList from "@/components/ShopList"
import MotionDiv from "@/components/MotionDiv"
import { client } from "@/sanity/client"
import { urlFor } from "@/sanity/image"

// mengubah data jadi SSG - lebih cepat secara performa dan SEO tapi harus redeploy tiap ada perubahan data
export const dynamic = 'force-static'

export const metadata = {
  title: "Shop | Your Brand",
  description: "Browse digital products, UI kits, and resources.",
}

const query = `*[_type == "shop"] | order(orderRank asc) {
    _id,
    title,
    slug,
    tags,
    coverImage,
    category,
    price
}`

export default async function Shop() {
    const shop = await client.fetch(query)

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

                <MotionDiv variant="up" del={0.7} styles="flex flex-col flex-1 gap-2 w-full">
                    <ShopList items={shop.map((e: any) => ({
                        _id: e._id,
                        title: e.title,
                        image: urlFor(e.coverImage).width(320).format("webp").url(),
                        price: e.price,
                        tags: e.tags,
                        category: e.category,
                        link: `/shop/${e.slug.current}`,
                    }))} />
                </MotionDiv>

            </section>
        </main>
    )
}