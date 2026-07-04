import LinkButton from '../components/LinkButton'
import MotionElement from '../components/MotionElement'

export default function NotFound() {
    return (
        <>
            <section className="h-screen flex-col gap-10">
                <MotionElement variant="up" styles="flex flex-col items-center gap-5">
                    <h1>I lost this page.</h1>
                    <p className="text-center">It seems the page you are looking for does not exist.</p>
                </MotionElement>
                <MotionElement variant="up" del={0.5}>
                    <LinkButton
                        title="Homepage"
                        link="/"
                    />
                </MotionElement>
            </section>
        </>
    )
}