'use client'

import { useRef, useEffect } from 'react'
import MotionDiv from './MotionDiv'
import LinkButton from './LinkButton'
import { m, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Divider from './Divider'

interface ProjectsSectionProps {
    title: string;
    description: string;
    link: string;
    video: string;
    variant?: keyof typeof variantProjectsSection;
    loopStart?: number;
}

const variantProjectsSection = {
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

const ProjectsSection = ({
    title,
    description,
    link,
    video,
    variant = "type A",
    loopStart = 0
}: ProjectsSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const visible = useInView(videoRef, { amount: 0 })

    // Track if video has played at least once
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (visible) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [visible]);

    // Custom loop: after first play, start from loopStart seconds
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleEnded = () => {
            video.currentTime = loopStart;
            video.play().catch(() => { });
        };

        video.addEventListener('ended', handleEnded);
        return () => {
            video.removeEventListener('ended', handleEnded);
        };
    }, [loopStart]);

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
            <MotionDiv variant={variantProjectsSection[variant].direction} styles={`flex flex-col gap-5 w-full sm:w-[35%] z-10 ${variantProjectsSection[variant].item1}`}>
                <Divider />
                <h2>{title}</h2>
                <p className="w-[90%]">{description}</p>
                <LinkButton title="View Project" link={link} />
            </MotionDiv>

            {/* VIDEO */}
            <m.div
                className={`w-full h-60 sm:flex-1 sm:h-full relative z-0 pointer-events-none ${variantProjectsSection[variant].item2}`}
                style={{ y, opacity }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-video w-[175%]">
                    <video
                        ref={videoRef}
                        src={video}
                        muted
                        playsInline
                        className="absolute inset-0 mx-auto h-full"
                    />
                </div>
            </m.div>

        </section>
    )
}

export default ProjectsSection