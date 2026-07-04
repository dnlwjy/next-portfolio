import MotionElement from '../../components/MotionElement';
import A from '../../components/A';
import AboutImage from './AboutImage';
import type { Metadata } from "next";
import Divider from '../../components/Divider';
import { client } from '../../sanity/lib/client'
import type { About } from '@/types/sanity.types'

// 1. const
const START_DATE = new Date('2020-12-20')
const YEARS_OF_EXPERIENCE = Math.round(
    (Date.now() - START_DATE.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
const DIVIDER = <svg xmlns="http://www.w3.org/2000/svg" className="w-1.75 lg:w-2.25" fill="currentColor" viewBox="-1 -1 7 12"><path stroke="var(--gray)" strokeWidth=".5" d="M.826 9.949H0L3.318.05h.826z" /></svg>
const SUPPORT = "flex flex-col gap-8 max-w-250 items-center mt-8"

// 2. queries
const query = `*[_type == "about" && _id == "about"][0] {
  heading,
  skills,
  experiences,
  clients,
}`

// 3. metadata
export const metadata: Metadata = {
    title: "About",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        url: "https://danielwijaya.com/about",
    },
}

// 4. render
export default async function About() {
    const about = await client.fetch<About>(query)

    return (
        <>
            <section id="about-me" className="sm">

                <MotionElement variant="up" styles="flex flex-col gap-8 items-center w-full max-w-280">
                    <div className="flex flex-col gap-4 items-center">
                        <span className="btn-text text-(--gray)">About me</span>
                        <h2>{about.heading}</h2>
                    </div>
                    <p className="text-center max-w-240">With a solid background in UI/UX design, I bridge the gap between design and development while understanding business context, user-centric thinking, scalable systems, and AI-powered solutions. In my spare time, I'm busy tinkering with <A title="side projects" link="/builds" /> and hitting the gym.</p>
                </MotionElement>

                <MotionElement variant="up" del={0.5} styles="w-full"><AboutImage /></MotionElement>

                <MotionElement variant="up" del={0.5} styles="flex flex-wrap gap-x-40 gap-y-16 w-full justify-center">
                    {about.skills?.map((e) => (
                        <div key={e._key} className="flex flex-col gap-4 items-center w-100">
                            <span className="btn-text text-(--gray)">
                                {e.category === "tools" ? "Tools" : "Stacks"}
                            </span>

                            <div className="flex flex-wrap gap-4 justify-center">
                                {e.items?.map((item, i) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <h3 className="text-[20px]">{item}</h3>
                                        {i < (e.items?.length ?? 0) - 1 && DIVIDER}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </MotionElement>
            </section>

            <section id="experience" className="sm py-0">
                <Divider styles="w-full" />
                <MotionElement variant="up" del={0.5} styles={SUPPORT}>
                    <div className="flex flex-col gap-4 max-w-280 items-center">
                        <span className="btn-text text-(--gray)">Experience</span>
                        <h2>Over {YEARS_OF_EXPERIENCE} years of experience</h2>
                    </div>
                    <p className="text-center max-w-280">As a fresh graduate living in the post-COVID era, I'm grateful enough to build connections from inside and outside home country. For more details, check out my <A title="LinkedIn page" link="https://www.linkedin.com/in/dnlwjy/" />.</p>
                </MotionElement>

                <MotionElement variant="up" del={0.5} styles="flex flex-col gap-8 sm:gap-4 py-4 w-full">
                    {about.experiences?.map((e) => (
                        <div key={e._key} className="flex sm:flex-row flex-col text-center sm:text-start">
                            <div className="w-full">
                                {e.url ? (
                                    <a href={e.url} className="text-[18px]" target="_blank" rel="noopener noreferrer">
                                        {e.company}
                                    </a>
                                ) : (
                                    <span className="text-[18px] text-(--white)">{e.company}</span>
                                )}
                            </div>
                            <span className="w-full text-[18px]">{e.role}</span>
                            <span className="w-full text-[18px]">{e.year}</span>
                        </div>
                    ))}
                </MotionElement>
            </section>

            <section id="clients" className="sm pt-32">
                <Divider styles="w-full" />
                <MotionElement variant="up" del={0.5} styles={SUPPORT}>
                    <div className="flex flex-col gap-4 max-w-280 items-center">
                        <span className="btn-text text-(--gray)">Clients</span>
                        <h2>Brands I’ve worked or partnered with...</h2>
                    </div>
                    <p className="text-center max-w-280">I've always loved partnering with amazing brands and companies around the world, and I can't wait to work with many more. If you're one of them, <A title="let's connect" link="/contact" />.</p>
                </MotionElement>

                <MotionElement variant="up" del={0.5} styles="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 w-full justify-items-center">
                    {about.clients?.map((e) => (
                        <div
                            key={e._key}
                            aria-label={e.name}
                            role="img"
                            className="w-36 sm:w-48 aspect-square flex items-center justify-center text-(--white)"
                            dangerouslySetInnerHTML={{ __html: e.svg ?? "" }}
                        />
                    ))}
                </MotionElement>
            </section>
        </>
    );
}