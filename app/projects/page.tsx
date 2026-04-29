import MotionDiv from '../../components/MotionDiv'
import { client } from '../../sanity/lib/client'
import ProjectsCard from '../../components/ProjectsCard'

// 1. Rendering config: switched to SSG - better performance and SEO, but has to redeploy every time there's data change
export const dynamic = 'force-static'

// 2. metadata (SEO / head)

// 3. queries
const query = `*[_type == "projects"] | order(year desc, orderRank asc) {
    _id,
    coverImage,
    title,
    description,
    tags,
    year,
    slug,
}`

export const listStyles = "flex flex-col gap-20 w-full"

export default async function Projects() {
    const projects = await client.fetch(query)

    return (
        <main>
            <section className="sm">
                
                <MotionDiv variant="up" styles="flex flex-col gap-6 items-center w-full">
                    <h1 className="text-center">
                        <span className="text-(--gray)">Archived</span>
                        <br />
                        Projects
                    </h1>
                    <p className="text-center">Archive of client-based projects from 2024 onward.</p>
                </MotionDiv>

                <div className={listStyles}>
                    {projects.map((e: any) => (
                        <ProjectsCard
                            key={e._id}
                            title={e.title}
                            desc={e.description}
                            tags={e.tags}
                            year={e.year}
                            link={`/projects/${e.slug.current}`}
                        />
                    ))}
                </div>

            </section>
        </main>
    )
}