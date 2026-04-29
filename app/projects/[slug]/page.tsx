import MotionDiv from '../../../components/MotionDiv'
import SubInfo from '@/components/SubInfo'
import Tag from '../../../components/Tag'
import { client } from '../../../sanity/lib/client'
import { PortableText } from "@portabletext/react"
import Serializers from "@/lib/Serializers"
import ProjectsCard from '../../../components/ProjectsCard'
import { notFound } from 'next/navigation'
import { listStyles } from '../page'

// 1. Rendering config: switched to SSG - better performance and SEO, but has to redeploy every time there's data change
export const dynamic = 'force-static'
export async function generateStaticParams() {
    const slugs: string[] = await client.fetch(`*[_type == "projects"].slug.current`)
    return slugs.map((slug) => ({ slug }))
}

// 2. metadata (SEO / head)

// 3. queries
const query = `*[_type == "projects" && slug.current == $slug][0]{
    _id,
    title,
    tags,
    year,
    content,
    documentation,
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
    slug,
}`

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await client.fetch(query, { slug });
    const moreProjects = await client.fetch(moreQuery, { slug });

    if (!project) {
        notFound();
    }

    return (
        <main>
            <section id="project-brief" className="sm items-start pb-0">

                <MotionDiv
                    variant="up"
                    styles="flex flex-col gap-6 w-full"
                >
                    <ul className="flex flex-wrap gap-3 sm:justify-center justify-start">
                        {project.tags.map((e: any) => (
                            <Tag key={e} title={e} />
                        ))}
                    </ul>
                    <h1 className="sm:text-center text-start">{project.title}</h1>
                </MotionDiv>

                <div className="flex md:flex-row flex-col md:gap-40 gap-24">
                    <MotionDiv del={0.5} styles="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 h-fit md:max-w-[400px] w-full gap-6">
                        <SubInfo
                            variant="plain"
                            title="Role"
                            subtitle={project.role}
                            styles="border-b border-(--divider) pb-6"
                        />
                        <SubInfo
                            variant="plain"
                            title="Client"
                            subtitle={project.client}
                            styles="border-b border-(--divider) pb-6"
                        />
                        <SubInfo
                            variant="plain"
                            title="Year"
                            subtitle={project.year}
                            styles="border-b border-(--divider) pb-6"
                        />
                        <SubInfo
                            variant="plain"
                            title="Website"
                            subtitle={project.website}
                            styles="border-b border-(--divider) pb-6"
                        />
                    </MotionDiv>
                    <MotionDiv del={0.7} variant="right" styles="flex-1">
                        <PortableText
                            value={project.content}
                            components={Serializers}
                        />
                    </MotionDiv>
                </div>
            </section>

            <section id="project-documentation" className="sm">
                <MotionDiv variant="up">
                    <PortableText
                        value={project.documentation}
                        components={Serializers}
                    />
                </MotionDiv>
            </section>

            <section id="more-projects" className="sm">
                <div className={listStyles}>
                    {moreProjects.map((e: any) => (
                        <ProjectsCard
                            key={e._id}
                            desc={e.description}
                            link={`/projects/${e.slug.current}`}
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