import LinkButton from '../components/LinkButton'
import Tag from '../components/Tag'
import Image from 'next/image'
import MotionDiv from './MotionDiv'

export interface CaseStudyCardProps {
    title: string
    description: string
    tags: string[]
    year: string
    link: string
    coverImage: string
}

export const CaseStudyCard = ({
    title,
    description,
    tags,
    year,
    link,
    coverImage
}: CaseStudyCardProps) => (
    <MotionDiv variant="up" styles="flex flex-col md:flex-row gap-8 p-8 sm:p-12 border border-(--divider)">

        <Image
            src={coverImage}
            alt={title}
            width={400}
            height={300}
            unoptimized
            className="md:h-full md:w-80 w-full object-cover border border-(--divider)"
        />

        <div className="flex flex-col gap-8 ">
            
            <div className="flex md:flex-row flex-col gap-4 justify-between">
                <ul className="flex gap-2 flex-wrap order-2 md:order-1">
                    {tags.map((tag) => (
                        <Tag key={tag} title={tag} />
                    ))}
                </ul>
                <p className="tag text-(--gray) order-1 md:order-2">{year}</p>
            </div>

            <div className="flex flex-col gap-4">
                <h2>{title}</h2>
                <p className="line-clamp-3">{description}</p>
            </div>

            <LinkButton title="View Project" link={link} />
        </div>


    </MotionDiv>
)

export default CaseStudyCard