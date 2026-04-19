'use client'

import { useState } from 'react'

interface TagProps {
    title?: string;
    styles?: string;
    // click?: () => void;
    clickable?: boolean;
}

const baseTag = `border border-(--divider) px-3 py-1`

const variantTag = {
    "default": "text-(--gray) hover:bg-(--divider)",
    "active": "text-(--black) bg-(--white)"
}

const Tag = ({
    title,
    styles = "",
    // click,
    clickable = false,
}: TagProps) => {
    const [isActive, setIsActive] = useState(false);

    if (!clickable) {
        return (
            <li className={`text-(--gray) ${baseTag} ${styles}`}>
                {title}
            </li>
        );
    }

    return (
        <li
            onClick={() => setIsActive(!isActive)}
            aria-label={title}
            aria-pressed={isActive}
            aria-disabled={!clickable}
            className={`cursor-pointer transition-colors duration-300
                ${isActive ? variantTag["active"] : variantTag["default"]} ${baseTag} ${styles}`}
        >
            {title}
        </li>
    )

};

export default Tag;