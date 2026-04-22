interface TagProps {
    title: string;
    variant?: keyof typeof variantTag;
    click?: () => void;
    styles?: string;
}

const baseTag = "border border-(--divider) text-(--bodytext) px-3 py-1 list-none"
const variantTag = {
    "static": "",
    "default": "cursor-pointer hover:border-(--gray) transition-colors duration-300",
    "active": "border-(--white)! text-(--white)!"
}

const Tag = ({
    title,

    variant = "static",
    click,
    styles = "",
}: TagProps) => {

    if (click) {
        return (
            <li>
                <button
                    onClick={click}
                    aria-label={title}
                    aria-pressed={variant === "active" ? true : undefined}
                    className={`${baseTag} ${variantTag[variant]} ${styles}`}
                >
                    {title}
                </button>
            </li>
        )
    }

    return (
        <li
            className={`${baseTag} ${variantTag[variant]} ${styles}`}
        >
            {title}
        </li>
    )
}

export default Tag;