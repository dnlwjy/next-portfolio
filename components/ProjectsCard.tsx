import LinkButton from './LinkButton'
import Tag from './Tag'
import MotionDiv from './MotionDiv'
import Divider from './Divider'

// all set to 'any' because we just pass the data from sanity directly
interface ProjectsProps {
    title: any
    desc: any
    tags: any
    year: any
    link: any
    styles?: string
}

export const ProjectsCard = ({
    title,
    desc,
    tags,
    year,
    link,
    styles = "",
}: ProjectsProps) => (
    <MotionDiv variant="up" styles={`flex flex-col gap-8 ${styles}`}>

        <Divider styles="w-full" title={year} />

        <div className="flex flex-col gap-4">
            <ul className="flex gap-2 flex-wrap">
                {tags.map((e: any) => (
                    <Tag key={e} title={e} />
                ))}
            </ul>
            <h2>{title}</h2>
            <p className="line-clamp-3">{desc}</p>
        </div>

        <LinkButton title="View Project" link={link} />

    </MotionDiv>
)

export default ProjectsCard