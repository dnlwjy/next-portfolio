import MotionDiv from '../../components/MotionDiv';
import A from '../../components/A';

interface BlockProps {
    title: string
    content: React.ReactNode
    styles?: string
}

const Block = ({ title, content, styles }: BlockProps) => (
    <div className={`flex flex-col sm:flex-row py-16 px-0 gap-4 justify-center w-full border-t border-(--divider) ${styles}`}>
        <span className="btn-text w-full sm:max-w-100">{title}</span>
        <p className="w-full sm:max-w-100">{content}</p>
    </div>
)

const CONTENT = [
    { title: "Design", content: <><A title="Figma" link="https://www.figma.com/" /> is my go-to tool for everything related to productivity. Not only design, I also use it as notepad, to-do list, planner, illustration, photo editing, time management, and more. It's also simple, collaborative, and covers all my needs.</> },
    { title: "Development", content: <>Coming Soon</> },
    { title: "Hardware", content: <>Coming Soon</> },
    { title: "Desk Setup", content: <>Coming Soon</> },
]

export default function Resources() {
    return (
        <main>
            <section id="resources" className="sm">

                <MotionDiv
                    variant="up"
                    styles="flex flex-col gap-4 max-w-125 items-center"
                >
                    <h1>Resources</h1>
                    <p className="text-center">A somewhat comprehensive list of tools, apps, hardware, and more that I use on a daily basis.</p>
                </MotionDiv>

                <MotionDiv variant="up" del={0.5} styles="flex flex-col gap-0 w-full">
                    {CONTENT.map((e) => (
                        <Block
                            key={e.title}
                            title={e.title}
                            content={e.content}
                        />
                    ))}
                </MotionDiv>

            </section>
        </main>
    );
}