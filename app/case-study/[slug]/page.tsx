import MotionDiv from '../../../components/MotionDiv';
import LinkButton from '../../../components/LinkButton';
import CaseStudyCard from '../page';
import SubInfo from '../../../components/SubInfo';
import Tag from '../../../components/Tag';
import { client } from '../../../sanity/lib/client'
import { groq } from 'next-sanity'

const placeholderContent = {
    title: "Dashboard in React.js (Web3 Project)",
    description: "This is a placeholder description for the case study. Replace this content with real data from your Sanity account.",
    tags: ["Placeholder Tag 1", "Placeholder Tag 2"],
    year: "2026",
    link: "#",
};

interface CaseStudyDetailProps {
    title: string;
    description: string;
    tags: string[];
    year: string;
    link: string;
}

const query = groq`*[_type == "projects"]{
    title,
    description,
    tags,
    year,
    "coverImage": coverImage.asset->url,
    "link": "/case-study/" + slug.current
}`

async function getCaseStudies(): Promise<CaseStudyDetailProps[]> {
    return client.fetch(query)
}

export default async function CaseStudyDetail({ params }: { params: { slug: string } }) {
    const caseStudy = await getCaseStudies();

    return (
        <main>
            <section className="sm">
                <MotionDiv
                    variant="up"
                    styles="flex flex-col gap-6 items-center text-center w-full"
                >
                    <ul className="flex gap-3 flex-wrap">
                        {placeholderContent.tags.map((tag) => (
                            <Tag key={tag} title={tag} />
                        ))}
                    </ul>
                    <h1 className="text-center">{caseStudy[2].title}</h1>
                </MotionDiv>

                <MotionDiv variant="up" del={0.5} styles="grid sm:grid-cols-2 grid-cols-1 gap-4 w-full my-10">
                    {caseStudy.map((e) => (
                        <SubInfo key={e.title} title={e.title} subtitle={e.description} styles="pb-8 border-b border-(--divider)" />
                    ))}

                </MotionDiv>

                <MotionDiv variant="up" del={0.7}>
                    <p>Solnite is a battle-royale game inspired by Fortnite’s fast-paced, stylized gameplay — but built on the Solana blockchain. The game is developed by a distributed Web3 team operating remotely without a physical headquarters. Solnite uses $NITE as its native token, powering in-game purchases, asset ownership, and a reward system which can be converted into real value, such as USDC. Because Solnite has a bunch of events and competitions, we needed a dashboard where participants could view their rewards in $NITE and USDC. I worked as a React developer working alongside with a backend developer to support the database API integration in Supabase. We used a template DoubleDice from my store for our landing page, then built a custom dashboard using React with secure login and signup credentials stored in environment variables. Aside from that, I was in touch with a product manager, to report issues and bugs that I found within the software, as well as to propose improvements regarding certain functionalities. It was exciting to see how the project evolved and improved with each update during this short time. The project has grown significantly, with over 10,000 registered users in Supabase in the first week and more than 5,000 participants actively joining the events. As the user base expanded, we needed to upgrade our infrastructure — particularly our Supabase setup — and implement an automated email system with onboarding and auto-reply flows to support communication, maintain engagement, and ensure a smooth experience for every participant.</p>
                </MotionDiv>

                <div className="flex flex-col gap-4 max-w-7xl">
                    <div className="flex flex-col border border-(--divider) p-8 sm:p-12 gap-8">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-3 flex-wrap">
                                {placeholderContent.tags.map((tag) => (
                                    <span key={tag} className="border border-(--divider) px-3 py-1 text-(--gray)">{tag}</span>
                                ))}
                            </div>
                            <p className="tag text-(--gray)">{placeholderContent.year}</p>
                        </div>
                        <CaseStudyCard key={placeholderContent.title} {...placeholderContent} />
                        <LinkButton title="View Project" link={placeholderContent.link} />
                    </div>
                </div>
            </section>

            <section id="more-case-studies" className="sm">
                <CaseStudyCard key={placeholderContent.title} {...placeholderContent} />
            </section>
        </main>
    );
}