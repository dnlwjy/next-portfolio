import MotionDiv from "@/components/MotionDiv";
import Tag from '@/components/Tag';
import Link from 'next/link';
import { Shop } from "../../../components/IconLibrary"
import Button from '../../../components/Button'

const Slash = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" fill="none" viewBox="-1 -1 7 12"><path stroke="var(--gray)" strokeWidth=".5" d="M.826 9.949H0L3.318.05h.826z" /></svg>
)

export default function ShopDetail({ params }: { params: { slug: string } }) {

    return (
        <main>
            <section className="flex-col sm:flex-row pt-40 gap-16">
                <MotionDiv styles="flex flex-col gap-4">
                    {/* breadcrumbs */}
                    <nav className="flex gap-3 items-center">
                        <Link href="/shop" className="group flex gap-2 items-center"><Shop size={14} styles="group-hover:text-(--white) transition-colors duration-300"/><p className="tag group-hover:text-(--white) transition-colors duration-300">Shop</p></Link>
                        <Slash />
                        <p className="tag">Esteem — Sport Car Dealership Template</p>
                    </nav>
                    <div className="aspect-square w-full relative bg-red-500">
                        <img src="/1.png" alt="Product Image" className="w-full h-full object-contain" />
                    </div>
                </MotionDiv>

                <MotionDiv variant="right" del={0.5} styles="flex flex-col gap-8">
                    <ul className="flex gap-3 flex-wrap">
                        <Tag title="New" />
                        <Tag title="New" />
                        <Tag title="New" />
                        <Tag title="New" />
                    </ul>
                    <div className="flex flex-col gap-4">
                        <h1>Esteem — Sport Car Dealership Template</h1>
                        <p>Esteem template is designed with a focus on eye-catching imagery or any product shots to capture the attention of potential customers and keep them engaged.</p>
                    </div>

                    <div className="flex flex-col w-full gap-2 max-w-200">
                        <Button title="Purchase Now" styles="w-full" />
                        <Button variant="secondary" title="Preview" styles="w-full" />
                    </div>
                </MotionDiv>
            </section>

            <section className="sm py-16">
                <MotionDiv variant="up" del={0.5}>
                <p>Solnite is a battle-royale game inspired by Fortnite’s fast-paced, stylized gameplay — but built on the Solana blockchain. The game is developed by a distributed Web3 team operating remotely without a physical headquarters. Solnite uses $NITE as its native token, powering in-game purchases, asset ownership, and a reward system which can be converted into real value, such as USDC. Because Solnite has a bunch of events and competitions, we needed a dashboard where participants could view their rewards in $NITE and USDC. I worked as a React developer working alongside with a backend developer to support the database API integration in Supabase. We used a template DoubleDice from my store for our landing page, then built a custom dashboard using React with secure login and signup credentials stored in environment variables. Aside from that, I was in touch with a product manager, to report issues and bugs that I found within the software, as well as to propose improvements regarding certain functionalities. It was exciting to see how the project evolved and improved with each update during this short time. The project has grown significantly, with over 10,000 registered users in Supabase in the first week and more than 5,000 participants actively joining the events. As the user base expanded, we needed to upgrade our infrastructure — particularly our Supabase setup — and implement an automated email system with onboarding and auto-reply flows to support communication, maintain engagement, and ensure a smooth experience for every participant.</p>
                </MotionDiv>
            </section>
        </main>
    );
}