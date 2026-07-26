'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { withCursorFollow } from '@/lib/withCursorFollow';
import { useTheme } from '@/context/ThemeProvider';

const AvaComponent = ({ opacityValue }: { opacityValue: MotionValue<number> }) => {
    const { theme } = useTheme();
    return (
        <div key={theme} className="aspect-3/4 inset-0 fade-in-theme-transition">
            <m.video
                src={theme === "dark" ? "/ava-black.mp4" : "/ava-white.webm"}
                poster={theme === "dark" ? "/poster-black.webp" : "/poster-white.webp"}
                style={{ opacity: opacityValue }}
                className="absolute inset-0"
                preload="auto"
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="absolute -inset-4 bg-[radial-gradient(farthest-side_at_center,transparent_75%,var(--black)_100%)]" />
        </div>
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
            <div className="aspect-3/4 h-[138%] shrink-0 relative min-w-64">
                <FollowVideo opacityValue={opacity} />
                <m.svg
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 80, mass: 1, delay: 1 }}
                    className="absolute left-1/2 -translate-x-1/2 w-[110%] aspect-square -bottom-24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 524 524">
                    <path stroke="var(--divider)" d="M0 524 524 0M183.704 373l196-196" />
                </m.svg>
            </div>
        </div>
    )
}

export default Ava;