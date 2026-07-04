'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { withCursorFollow } from '@/lib/withCursorFollow';
import { useTheme } from '@/context/ThemeProvider';

const AvaComponent = ({ opacityValue }: { opacityValue: MotionValue<number> }) => {
    const { theme } = useTheme();
    return (
        <m.video
            src={theme === "dark" ? "/ava-black.mp4" : "/ava-white.webm"}
            poster={theme === "dark" ? "/poster-black.webp" : "/poster-white.webp"}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1, ease: [0.44, 0, 0.56, 1], delay: 0.3 }}
            style={{ opacity: opacityValue }}
            className="absolute top-0 inset-x-0 mx-auto w-full"
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
        />
    );
}

const FollowVideo = withCursorFollow(AvaComponent);

const Ava = () => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', '70% start'],
    })
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

    return (
        <div ref={ref} className="flex flex-1 items-start justify-center z-0">
            <div className="aspect-3/4 h-[138%] shrink-0 relative min-w-64 overflow-hidden">
                <FollowVideo opacityValue={opacity} />
                <div className="absolute inset-0 bg-[radial-gradient(farthest-side_at_center,transparent_80%,var(--black)_100%)]" />
                <m.svg
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 80, mass: 1, delay: 0.8 }}
                    className="absolute w-full aspect-square -bottom-16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 524 524">
                    <path stroke="var(--divider)" d="M0 524 524 0M183.704 373l196-196" />
                </m.svg>
            </div>
        </div>
    )
}

export default Ava;