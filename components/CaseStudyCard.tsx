import LinkButton from '../components/LinkButton'
import Tag from '../components/Tag'
import MotionDiv from './MotionDiv'

// all set to 'any' because we just pass the data from sanity directly
interface CaseStudyCardProps {
    title: any
    desc: any
    tags: any
    year: any
    link: any
    styles?: string
}

export const CaseStudyCard = ({
    title,
    desc,
    tags,
    year,
    link,
    styles = "",
}: CaseStudyCardProps) => (
    <MotionDiv variant="up" styles={`flex flex-col gap-8 p-6 py-12 md:p-12 border border-(--divider) ${styles}`}>

        <div className="flex md:flex-row flex-col gap-4 justify-between">
            <ul className="flex gap-2 flex-wrap order-2 md:order-1">
                {tags.map((e: any) => (
                    <Tag key={e} title={e} />
                ))}
            </ul>
            <span className="tag text-(--gray) order-1 md:order-2">{year}</span>
        </div>

        <div className="flex flex-col gap-4">
            <h2>{title}</h2>
            <p className="line-clamp-3">{desc}</p>
        </div>

        <LinkButton title="View Project" link={link} />

    </MotionDiv>
)

export default CaseStudyCard