import LinkButton from './LinkButton'
import MotionElement, { variantMotionElement } from './MotionElement'
import Divider from './Divider'
import type { Projects } from '@/types/sanity.types'

interface CaseStudyProps {
    title: Projects['title']
    desc: Projects['description']
    year?: Projects['year']
    link: string
    variant?: keyof typeof variantMotionElement
    longDivider?: boolean
    styles?: string
}

export const TitleCard = ({
    title,
    desc,
    year,
    link,
    variant,
    longDivider = false,
    styles = "",
}: CaseStudyProps) => (
    <MotionElement
        variant={variant}
        styles={`flex flex-col gap-8 z-10 ${styles}`}
    >
        <div className="flex flex-col gap-4">
            <Divider styles={longDivider ? "w-full mb-4" : ""} title={year} />
            <h2 className="text-start">{title}</h2>
            <p className="w-[90%]">{desc}</p>
        </div>

        <LinkButton title="View Project" link={link} />
    </MotionElement>
)

export default TitleCard