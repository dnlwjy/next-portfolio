import MotionDiv from '../../components/MotionDiv'
import LinkButton from '../../components/LinkButton'
import Tag from '../../components/Tag'
import { client } from '../../sanity/lib/client'
import { groq } from 'next-sanity'

interface CaseStudyCardProps {
    title: string
    description: string
    tags: string[]
    year: string
    link: string
}

export const CaseStudyCard = ({ title, description, tags, year, link }: CaseStudyCardProps) => (
    <MotionDiv variant="up" styles="flex flex-col border border-(--divider) p-8 sm:p-12 gap-8">
        <div className="flex justify-between items-start">
            <ul className="flex gap-3 flex-wrap">
                {tags.map((tag) => (
                    <Tag key={tag} title={tag} />
                ))}
            </ul>
            <p className="tag text-(--gray)">{year}</p>
        </div>
        <div className="flex flex-col gap-4">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        <LinkButton title="View Project" link={link} />
    </MotionDiv>
)

const query = groq`*[_type == "projects"]{
    title,
    description,
    tags,
    year,
    "link": "/case-study/" + slug.current
}`

async function getCaseStudies(): Promise<CaseStudyCardProps[]> {
  return await client.fetch(query)
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
                    <p className="text-center">Archive of completed projects where design and engineering collaborated to solve real problems.</p>
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