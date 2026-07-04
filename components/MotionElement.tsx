'use client'

import { m } from "framer-motion";
import { useMemo } from "react";

interface MotionElementProps {
    children: React.ReactNode;
    as?: keyof HTMLElementTagNameMap;
    variant?: keyof typeof variantMotionElement;
    del?: 0.3 | 0.5 | 0.7;
    styles?: string;
}

export const variantMotionElement = {
    up: { x: 0, y: 24 },
    down: { x: 0, y: -24 },
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
}

const MotionElement = ({
    children,
    as = "div",
    variant = "left",
    del = 0.3,
    styles
}: MotionElementProps) => {
    const Element = useMemo(() => m.create(as), [as]);

    return (
        <Element
            initial={{ opacity: 0, ...variantMotionElement[variant] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 80, mass: 1, delay: del }}
            viewport={{ once: true, amount: 0 }}
            className={styles}
        >
            {children}
        </Element>
    );
};

export default MotionElement;