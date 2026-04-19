import MotionDiv from '../../components/MotionDiv'
import ContactForm from '@/components/ContactForm'
import FaqAccordion from '@/components/FaqAccordion'
import SubInfo from '@/components/SubInfo'

export default function Contact() {
    return (
        <main>
            <section id="contact" className="sm pb-32">
                <MotionDiv
                    variant="up"
                    styles="flex flex-col items-center gap-12 w-full"
                >
                    <h1 className="text-center">
                        <span className="text-(--gray)">Let’s Work</span>
                        <br />
                        Together
                    </h1>
                </MotionDiv>

                <MotionDiv
                    del={0.5}
                    variant="up"
                    styles="flex flex-col gap-12 w-full"
                >
                    <ContactForm styles="w-full" />
                </MotionDiv>
            </section>

            <section id="my-info" className="sm py-0">
                <MotionDiv variant="up" del={0.5} styles="flex flex-col gap-12 w-full items-center">
                    <h2 className="text-center">Personal Info</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
                        <SubInfo title="Email" subtitle="wijayadaniel19@gmail.com" styles="flex-1 border border-(--divider)" />
                        <SubInfo title="Address" subtitle="Puri Kencana K1 / 19 , Kembangan, Jakarta, Indonesia" styles="flex-1 border border-(--divider)" />
                        <SubInfo title="Linkedin" subtitle="https://www.linkedin.com/in/dnlwjy/" styles="flex-1 border border-(--divider)" />
                        <SubInfo title="WhatsApp" subtitle="+628111388895" styles="flex-1 border border-(--divider)" />
                    </div>
                </MotionDiv>
            </section>

            <section id="faq" className="sm">
                <MotionDiv
                    variant="up"
                    styles="flex flex-col gap-12 w-full items-center"
                >
                    <h2>Frequently Asked Questions</h2>
                    <div className="flex flex-col gap-2 w-full">
                        <FaqAccordion Q="What is your design process like? Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions Frequently Asked Questions" A="My design process starts with understanding the problem and user needs through research. I then ideate and sketch solutions, create wireframes and prototypes, and iterate based on feedback until we arrive at a final design." />
                        <FaqAccordion Q="What is your design process like?" A="My design process starts with understanding the problem and user needs through research. I then ideate and sketch solutions, create wireframes and prototypes, and iterate based on feedback until we arrive at a final design." />
                    </div>

                </MotionDiv>
            </section>
        </main>
    )
}