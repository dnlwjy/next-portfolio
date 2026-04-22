import MotionDiv from '../../../components/MotionDiv';
import SubInfo from '../../../components/SubInfo';
import Tag from '../../../components/Tag';
import { client } from '../../../sanity/lib/client'
import { groq } from 'next-sanity'
import { PortableText } from "@portabletext/react";
import Serializers from "@/lib/Serializers";
import Image from 'next/image';
import { urlFor } from '../../../sanity/lib/image'

const query = groq`*[_type == "projects" && slug.current == $slug][0]{
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

// // Paksa halaman ini jadi static — tidak ada server fetch saat runtime
// export const dynamic = 'force-static'

// // Pre-render semua slug dari Sanity saat `npm run build`
// export async function generateStaticParams() {
//     const slugs: string[] = await client.fetch(groq`*[_type == "projects"].slug.current`)
//     return slugs.map((slug) => ({ slug }))
// }

export default async function CaseStudyDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const caseStudy = await client.fetch(query, { slug });

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

                <Image
                    src={urlFor(caseStudy.coverImage).width(360).format('webp').url()}
                    alt={caseStudy.title}
                    width={800} height={600}
                    className="w-full h-auto object-cover my-4 border border-(--divider)"
                />

                <MotionDiv variant="up" del={0.7}>
                    <PortableText
                        value={caseStudy.content}
                        components={Serializers}
                    />
                </MotionDiv>
            </section>
        </main>
    );
}