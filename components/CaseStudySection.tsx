'use client'

import { useRef, useEffect } from 'react'
import MotionDiv from './MotionDiv'
import LinkButton from './LinkButton'
import { m, useScroll, useTransform, useSpring, useInView } from "framer-motion"

interface CaseStudySectionProps {
    title: string;
    description: string;
    link: string;
    video: string;
    variant?: keyof typeof variantCaseStudySection;
}

const variantCaseStudySection = {
    "type A": {
        item1: "order-2 sm:order-1",
        item2: "order-1 sm:order-2",
        direction: "left",
        shade: "inset-0"
    },
    "type B": {
        item1: "order-2",
        item2: "order-1",
        direction: "right",
        shade: "aspect-square h-full inset-x-0 mx-auto"
    },
} as const

const springConfig = { stiffness: 132, damping: 60 }

const CaseStudySection = ({
    title,
    description,
    link,
    video,
    variant = "type A"
}: CaseStudySectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const visible = useInView(videoRef, { amount: 0 })

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (visible) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [visible]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 80%", "end 20%"]
    })

    const opacity = useSpring(useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [0, 1, 0]
    ), springConfig)

    const y = useSpring(useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [128, 0, 0]
    ), springConfig)

    return (
        <section ref={sectionRef} className="h-fit sm:h-[90vh] flex-col sm:flex-row items-start max-w-450 max-h-270 relative">

            {/* TEXT */}
            <MotionDiv variant={variantCaseStudySection[variant].direction} styles={`flex flex-col gap-5 w-full sm:w-[35%] z-10 ${variantCaseStudySection[variant].item1}`}>
                <div className="flex w-18 border-b border-b-(--divider)">
                    <svg width="42" height="5" viewBox="0 0 42 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42 5H0L6.26866 0H35.7313L42 5Z" fill="var(--divider)" />
                    </svg>
                </div>
                <h2>{title}</h2>
                <p className="w-[90%]">{description}</p>
                <LinkButton title="View Details" link={link} />
            </MotionDiv>

            {/* VIDEO */}
            <m.div
                className={`w-full h-60 sm:flex-1 sm:h-full relative z-0 pointer-events-none ${variantCaseStudySection[variant].item2}`}
                style={{ y, opacity }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-video w-[175%]">
                    <video
                        ref={videoRef}
                        src={video}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 mx-auto h-full"
                    />
                </div>
            </m.div>

        </section>
    )
}

export default CaseStudySection