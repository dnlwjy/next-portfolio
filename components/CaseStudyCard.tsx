import LinkButton from '../components/LinkButton'
import Tag from '../components/Tag'
import Image from 'next/image'
import MotionDiv from './MotionDiv'

// all set to 'any' because we just pass the data from sanity directly
interface CaseStudyCardProps {
    title: any
    desc: any
    tags: any
    year: any
    image: any
    link: any
    styles?: string
}

export const CaseStudyCard = ({
    title,
    desc,
    tags,
    year,
    image,
    link,
    styles = "",
}: CaseStudyCardProps) => (
    <MotionDiv variant="up" styles={`flex flex-col md:flex-row gap-8 p-8 sm:p-12 border border-(--divider) ${styles}`}>

        <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            // let urlFor handle the optimization
            unoptimized
            className="md:h-full md:w-80 w-full object-cover border border-(--divider)"
        />

        <div className="flex flex-col gap-8">
            
            <div className="flex md:flex-row flex-col gap-4 justify-between">
                <ul className="flex gap-2 flex-wrap order-2 md:order-1">
                    {tags.map((e: any) => (
                        <Tag key={e} title={e} />
                    ))}
                </ul>
                <p className="tag text-(--gray) order-1 md:order-2">{year}</p>
            </div>

            <div className="flex flex-col gap-4">
                <h2>{title}</h2>
                <p className="line-clamp-3">{desc}</p>
            </div>

            <LinkButton title="View Project" link={link} />
        </div>


    </MotionDiv>
)

export default CaseStudyCard