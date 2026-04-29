import MotionDiv from "@/components/MotionDiv"
import { client } from "@/sanity/lib/client"
import BtnSupport from "./BtnSupport"
import { urlFor } from "@/sanity/lib/image"
import ItemZoom from "@/components/ItemZoom"
import { notFound } from "next/navigation"
import Catalogue from "@/components/Catalogue"
import ItemCard from "@/components/ItemCard"

// 1. Rendering config: switched to SSG - better performance and SEO, but has to redeploy every time there's data change
export const dynamic = 'force-static'
export async function generateStaticParams() {
    const slugs: string[] = await client.fetch(`*[_type == "shop"].slug.current`)
    return slugs.map((slug) => ({ slug }))
}

// 2. metadata (SEO / head)

// 3. queries
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

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const work = await client.fetch(query, { slug });
    const moreWorks = await client.fetch(moreQuery, { slug });

    if (!work) {
        notFound();
    }

    return (
        <main>
            <section className="flex-col md:flex-row pt-40 gap-16 max-w-640 min-h-screen">
                <MotionDiv styles="flex aspect-square border border-(--divider) bg-(--white)/7 justify-center items-center md:w-1/3 w-full md:min-w-[520px] max-w-[640px]">
                    {work.coverImage && (
                        <ItemZoom
                            image={urlFor(work.coverImage).width(480).format("webp").url()}
                            alt={work.title}
                        />
                    )}
                </MotionDiv>

                <MotionDiv variant="right" del={0.5} styles="flex flex-col gap-10 flex-1">
                    <div className="flex flex-col gap-4">
                        <span className="btn-text text-(--gray)">{work.category}</span>
                        <h1>{work.title}</h1>
                        <p className="max-w-200">{work.description}</p>
                    </div>

                    <BtnSupport checkoutURL={work.checkout} previewURL={work.preview} />
                </MotionDiv>
            </section>

            <section id="more-works" className="py-10">
                <MotionDiv variant="up" styles="flex flex-col gap-24 w-full">
                    <Catalogue title={`More ${work.category}`}>
                        {moreWorks
                            .filter((e: any) => e.category === work.category)
                            .map((e: any) => (
                                <ItemCard
                                    key={e._id}
                                    title={e.title}
                                    image={urlFor(e.coverImage).width(320).format("webp").url()}
                                    link={`/works/${e.slug.current}`}
                                />
                            ))}
                    </Catalogue>
                </MotionDiv>
            </section>

        </main>
    );
}