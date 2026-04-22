import MotionDiv from '../../components/MotionDiv'
import { client } from '../../sanity/lib/client'
import { groq } from 'next-sanity'
import CaseStudyCard from '../../components/CaseStudyCard'
import { urlFor } from '../../sanity/lib/image'

// // Pre-render halaman ini saat `npm run build` — navigasi dari Home akan instan
// export const dynamic = 'force-static'

const query = groq`*[_type == "projects"] | order(orderRank asc) {
    _id,
    coverImage,
    title,
    description,
    tags,
    year,
    slug,
}`

export default async function CaseStudy() {
    const caseStudies = await client.fetch(query)

    return (
        <main>
            <section className="sm">
                
                <MotionDiv
                    variant="up"
                    styles="flex flex-col gap-6 items-center text-center w-full"
                >
                    <h1>Case Study</h1>
                    <p className="text-center">Archive of completed projects from 2024 onwards.</p>
                </MotionDiv>

                <MotionDiv
                    variant="up"
                    del={0.5}
                    styles="flex flex-col gap-4 w-full">
                    {caseStudies.map((e: any) => (
                        <CaseStudyCard
                            key={e._id}
                            image={urlFor(e.coverImage).width(360).format('webp').url()}
                            title={e.title}
                            desc={e.description}
                            tags={e.tags}
                            year={e.year}
                            link={`/case-study/${e.slug.current}`}
                        />
                    ))}
                </MotionDiv>

            </section>
        </main>
    )
}