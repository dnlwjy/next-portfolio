import MotionElement from '../../../components/MotionElement'
import SubInfo from '@/components/SubInfo'
import { client } from '../../../sanity/lib/client'
import { PortableText } from "@portabletext/react"
import Serializers from "@/lib/Serializers"
import TitleCard from '../../../components/TitleCard'
import { notFound } from 'next/navigation'
import { listStyles } from '../page'
import type { Metadata } from "next";
import { urlFor } from '../../../sanity/lib/image'
import type { Projects } from '@/types/sanity.types'
import { SUPPORT } from '../../contact/page'

// 1. const
const SITE_URL = "https://danielwijaya.com"

// 2. queries
const query = `*[_type == "projects" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _updatedAt,
    title,
    description,
    coverImage,
    role,
    client,
    year,
    website,
    content,
    documentation,
}`
const moreQuery = `*[_type == "projects" && slug.current != $slug]{
    _id,
    title,
    description,
    year,
    slug,
}`

// 3. slug
export async function generateStaticParams() {
    const slugs: string[] = await client.fetch(`*[_type == "projects"].slug.current`)
    return slugs.map((slug) => ({ slug }))
}

// 4. metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const data = await client.fetch(`*[_type == "projects" && slug.current == $slug][0]{
        title,
        description,
        coverImage
        }`,
        { slug }
    )
    if (!data) return {}

    const image = data.coverImage
        ? urlFor(data.coverImage).width(1200).height(630).url()
        : "/og-default.jpg"

    return {
        title: data.title,
        description: data.description,

        openGraph: {
            title: data.title,
            description: data.description,
            type: "article",
            images: [image],
            url: `/case-study/${slug}`,
        },

        twitter: {
            card: "summary_large_image",
            title: data.title,
            description: data.description,
            images: [image],
        },

        alternates: {
            canonical: `/case-study/${slug}`,
        },
    }
}

// 5. render
export default async function CaseStudyDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const caseStudy = await client.fetch(query, { slug });
    const moreCaseStudies = await client.fetch(moreQuery, { slug });

    if (!caseStudy) notFound()

    // 6. const JSON-LD
    const image = caseStudy.coverImage
        ? urlFor(caseStudy.coverImage).width(1200).height(630).url()
        : `${SITE_URL}/og-default.jpg`

    const JSONLD = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${SITE_URL}/case-study/${slug}#techarticle`,
        headline: caseStudy.title,
        description: caseStudy.description,
        image,
        url: `${SITE_URL}/case-study/${slug}`,
        datePublished: caseStudy._createdAt,
        dateModified: caseStudy._updatedAt,
        author: { '@id': `${SITE_URL}/#person` },
    }

    const BREADCRUMB_JSONLD = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Case Study',
                item: `${SITE_URL}/case-study`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: caseStudy.title,
                item: `${SITE_URL}/case-study/${slug}`,
            },
        ],
    }

    return (
        <>
            {/* Case Study */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(JSONLD).replace(/</g, '\\u003c'),
                }}
            />

            {/* Breadcrumb */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(BREADCRUMB_JSONLD).replace(/</g, '\\u003c'),
                }}
            />

            <section id="case-study-brief" className="sm pb-0">

                <MotionElement variant="up" styles="flex flex-col gap-4 items-center">
                    <span className="btn-text text-(--gray)">Case Study</span>
                    <h1>{caseStudy.title}</h1>
                </MotionElement>

                <div className={SUPPORT}>
                    <MotionElement as="dl" del={0.5} styles="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 h-fit md:max-w-[360px] w-full gap-6">
                        <SubInfo title="Role" subtitle={caseStudy.role} />
                        <SubInfo title="Client" subtitle={caseStudy.client} />
                        <SubInfo title="Year" subtitle={caseStudy.year} />
                        <SubInfo title="Website" subtitle={caseStudy.website} />
                    </MotionElement>
                    <MotionElement del={0.7} variant="right" styles="flex-1">
                        <PortableText value={caseStudy.content} components={Serializers} />
                    </MotionElement>
                </div>
            </section>

            <section id="case-study-documentation" className="sm">
                <MotionElement variant="up">
                    <PortableText
                        value={caseStudy.documentation}
                        components={Serializers}
                    />
                </MotionElement>
            </section>

            <section id="more-case-studies" className="sm">
                <div className={listStyles}>
                    {moreCaseStudies.map((e: Projects) => (
                        <TitleCard
                            key={e._id}
                            title={e.title}
                            desc={e.description}
                            year={e.year}
                            link={`/case-study/${e.slug!.current}`}
                            longDivider
                            styles="w-full"
                        />
                    ))}
                </div>
            </section>
        </>
    );
}