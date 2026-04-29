import MotionDiv from "@/components/MotionDiv"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Catalogue from "@/components/Catalogue"
import ItemCard from '@/components/ItemCard'

// 1. Rendering config: switched to SSG - better performance and SEO, but has to redeploy every time there's data change
export const dynamic = 'force-static'

// 2. metadata (SEO / head)
export const metadata = {
    title: "Works | Daniel Wijaya",
    description: "Everything about my hobby, interests, code, and more...",
}

// 3. queries
const query = `*[_type == "shop"] | order(orderRank asc) {
    _id,
    title,
    slug,
    tags,
    coverImage,
    category,
    price
}`

export default async function Works() {
    const works = await client.fetch(query)

    return (
        <main>
            <section className="flex-col pt-40 gap-16">

                <MotionDiv variant="up" styles="flex flex-col gap-6 items-center w-full">
                    <h1 className="text-center">
                        <span className="text-(--gray)">More of</span>
                        <br />
                        My Works
                    </h1>
                    <p className="text-center">Everything about my hobby, interests, code, and more...</p>
                </MotionDiv>

                <MotionDiv variant="up" del={0.7} styles="flex flex-col gap-24 w-full">
                    {works
                        .filter((pass: any, index: number, self: any[]) =>
                            pass.category && self.findIndex((e) => e.category === pass.category) === index
                        )
                        .map((pass: any) => (
                            <Catalogue key={pass.category} title={pass.category}>
                                {works
                                    .filter((e: any) => e.category === pass.category)
                                    .map((e: any) => (
                                        <ItemCard
                                            key={e._id}
                                            title={e.title}
                                            image={urlFor(e.coverImage).width(320).format("webp").url()}
                                            link={`/works/${e.slug.current}`}
                                        />
                                    ))}
                            </Catalogue>
                        ))}
                </MotionDiv>

            </section>
        </main>
    )
}