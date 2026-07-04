import { Metadata } from 'next'
import MotionElement from '../../components/MotionElement'
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
        <>
            <section id="contact" className="sm">

                <MotionElement variant="up" styles="flex flex-col gap-4 items-center">
                    <h1>
                        <span className="text-(--gray)">Let’s Work</span>
                        <br />
                        Together
                    </h1>
                </MotionElement>

                <div className="flex md:flex-row flex-col md:gap-40 gap-24 w-full">
                    <MotionElement as="aside" del={0.5} styles="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 h-fit md:max-w-[360px] w-full gap-6">
                        <dl className="flex flex-col gap-6">
                            <SubInfo title="Email" subtitle="wijayadaniel19@gmail.com" />
                            <SubInfo title="Location" subtitle="Jakarta, Indonesia" />
                            <SubInfo title="WhatsApp" subtitle="+628111388895" />
                        </dl>

                        <ul className="flex gap-6 items-start pt-2">
                            {socialMedia.map((e) => (
                                <li key={e.name}>
                                    <a
                                        href={e.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-(--white) transition-colors duration-300"
                                        aria-label={e.name}
                                    >
                                        {e.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </MotionElement>

                    <MotionElement as="aside" del={0.7} variant="right" styles="flex flex-col flex-1 gap-16">
                        <ContactForm styles="w-full" />
                    </MotionElement>
                </div>
            </section>
        </>
    )
}