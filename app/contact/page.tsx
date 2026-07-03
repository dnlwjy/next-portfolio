import { Metadata } from 'next'
import MotionDiv from '../../components/MotionDiv'
import ContactForm from '@/components/ContactForm'
import SubInfo from '@/components/SubInfo'
import { IG, LI, Github } from "../../components/IconLibrary";

// 1. const
const socialMedia = [
    { name: "Instagram", link: "https://www.instagram.com/dnlwjy_/", icon: <IG styles="text-(--gray) hover:text-(--white) transition-colors duration-300" /> },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/dnlwjy/", icon: <LI styles="text-(--gray) hover:text-(--white) transition-colors duration-300" /> },
    { name: "GitHub", link: "https://github.com/dnlwjy", icon: <Github styles="text-(--gray) hover:text-(--white) transition-colors duration-300" /> },
]

// 2. queries

// 3. metadata
export const metadata: Metadata = {
    title: "Contact",
    description: "Have a project in mind? Let's talk — I'm open to freelance, collaboration, and full-time opportunities.",
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        url: "https://danielwijaya.com/contact",
    },
}

// 4. render
export default function Contact() {

    return (
        <main>
            <section id="contact" className="sm">

                <MotionDiv variant="up" styles="flex flex-col gap-4 items-center">
                    <h1>
                        <span className="text-(--gray)">Let’s Work</span>
                        <br />
                        Together
                    </h1>
                </MotionDiv>

                <div className="flex md:flex-row flex-col md:gap-40 gap-24 w-full">
                    <MotionDiv del={0.5} styles="flex-1">
                        <ContactForm styles="w-full" />
                    </MotionDiv>
                    <MotionDiv del={0.7} variant="right" styles="flex flex-col h-fit md:max-w-[360px] w-full gap-6 justify-start">
                        <SubInfo title="Email" subtitle="wijayadaniel19@gmail.com" />
                        <SubInfo title="Location" subtitle="Jakarta, Indonesia" />
                        <span className="flex gap-6 items-start pt-2">
                            {socialMedia.map((e) => (
                                <a
                                    key={e.name}
                                    href={e.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-(--white) transition-colors duration-300"
                                >
                                    {e.icon}
                                </a>
                            ))}
                        </span>
                    </MotionDiv>
                </div>
            </section>
        </main>
    )
}