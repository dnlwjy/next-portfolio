import MotionDiv from '../../components/MotionDiv'
import { client } from '../../sanity/client'
import CaseStudyCard from '../../components/CaseStudyCard'

// mengubah data jadi SSG - lebih cepat secara performa dan SEO tapi harus redeploy tiap ada perubahan data
export const dynamic = 'force-static'

const query = `*[_type == "projects"] | order(orderRank asc) {
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

                <div className="grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
                    {caseStudies.map((e: any) => (
                        <CaseStudyCard
                            key={e._id}
                            title={e.title}
                            desc={e.description}
                            tags={e.tags}
                            year={e.year}
                            link={`/case-study/${e.slug.current}`}
                        />
                    ))}
                </div>

            </section>
        </main>
    )
}