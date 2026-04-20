'use client'

import { m } from 'framer-motion'
import { withCursorFollow } from '@/lib/withCursorFollow';
import { useTheme } from '@/context/ThemeProvider';

const AvaComponent = () => {
    const { theme } = useTheme();
    return (
        <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1, ease: [0.44, 0, 0.56, 1] }}
            className="aspect-3/4 h-[138%] relative">
            <video
                src={theme === 'dark' ? '/BACKUP-107.webm' : '/BACKUP-124.webm'}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 inset-x-0 mx-auto w-full"
            />
            <div className="absolute inset-0 bg-[radial-gradient(farthest-side_at_center,transparent_90%,var(--black)_100%)]" />
        </m.div>
    );
}

const FollowVideo = withCursorFollow(AvaComponent);

const Ava = () => {
    console.log("COMP: Ava")
    return (
    <div className="flex flex-1 items-start justify-center z-0">
        <div className="aspect-3/4 h-[138%] relative">
            <FollowVideo />
            <m.svg
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 80, mass: 1, delay: 0.5 }}
                className="absolute w-full aspect-square -bottom-16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 524 524">
                <path stroke="var(--divider)" d="M0 524 524 0M183.704 373l196-196" />
            </m.svg>
        </div>
    </div>
)}

export default Ava;