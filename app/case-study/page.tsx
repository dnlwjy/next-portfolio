import MotionDiv from '../../components/MotionDiv'
import { client } from '../../sanity/lib/client'
import { groq } from 'next-sanity'
import { CaseStudyCardProps } from '../../components/CaseStudyCard'
import CaseStudyCard from '../../components/CaseStudyCard'

const query = groq`*[_type == "projects"]{
    title,
    description,
    tags,
    year,
    "coverImage": coverImage.asset->url,
    "link": "/case-study/" + slug.current
}`

async function getCaseStudies(): Promise<CaseStudyCardProps[]> {
  return client.fetch(query)
}

export default async function CaseStudy() {
    const caseStudies = await getCaseStudies()
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
                    {caseStudies.map((e) => (
                        <CaseStudyCard key={e.title} {...e} />
                    ))}
                </MotionDiv>
            </section>
        </main>
    )
}