import MotionDiv from '../../../components/MotionDiv'
import SubInfo from '../../../components/SubInfo'
import Tag from '../../../components/Tag'
import { client } from '../../../sanity/client'
import { PortableText } from "@portabletext/react"
import Serializers from "@/lib/Serializers"
import CaseStudyCard from '../../../components/CaseStudyCard'
import { notFound } from 'next/navigation'

const query = `*[_type == "projects" && slug.current == $slug][0]{
    _id,
    title,
    tags,
    year,
    coverImage,
    content,
    role,
    client,
    website,
}`

const moreQuery = `*[_type == \"projects\" && slug.current != $slug]{
    _id,
    title,
    tags,
    description,
    year,
    coverImage,
    desc,
    slug,
}`

// mengubah data jadi SSG - lebih cepat secara performa dan SEO tapi harus redeploy tiap ada perubahan data
export const dynamic = 'force-static'

// Pre-render semua slug dari Sanity saat `npm run build`
export async function generateStaticParams() {
    const slugs: string[] = await client.fetch(`*[_type == "projects"].slug.current`)
    return slugs.map((slug) => ({ slug }))
}

export default async function CaseStudyDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const caseStudy = await client.fetch(query, { slug });
    const moreCaseStudies = await client.fetch(moreQuery, { slug });

    if (!caseStudy) {
        notFound();
    }

    return (
        <main>
            <section className="sm">
                <MotionDiv
                    variant="up"
                    styles="flex flex-col gap-6 items-center text-center w-full"
                >
                    <ul className="flex gap-3 flex-wrap">
                        {caseStudy.tags.map((e: any) => (
                            <Tag key={e} title={e} />
                        ))}
                    </ul>
                    <h1 className="text-center">{caseStudy.title}</h1>
                </MotionDiv>

                <MotionDiv variant="up" del={0.5} styles="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
                    <SubInfo
                        title="Role"
                        subtitle={caseStudy.role}
                    />
                    <SubInfo
                        title="Client"
                        subtitle={caseStudy.client}
                    />
                    <SubInfo
                        title="Year"
                        subtitle={caseStudy.year}
                    />
                    <SubInfo
                        title="Website"
                        subtitle={caseStudy.website}
                    />
                </MotionDiv>

                <MotionDiv variant="up" del={0.7}>
                    <PortableText
                        value={caseStudy.content}
                        components={Serializers}
                    />
                </MotionDiv>
            </section>

            <section id="more-case-studies" className="sm pt-20 gap-40">
                <div className="flex w-18 border-b border-b-(--divider)">
                    <svg width="42" height="5" viewBox="0 0 42 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42 5H0L6.26866 0H35.7313L42 5Z" fill="var(--divider)" />
                    </svg>
                </div>
                <div className="grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
                    {moreCaseStudies.map((e: any) => (
                        <CaseStudyCard
                            key={e._id}
                            desc={e.description}
                            link={`/case-study/${e.slug.current}`}
                            tags={e.tags}
                            title={e.title}
                            year={e.year}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}