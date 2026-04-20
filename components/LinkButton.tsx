import Link from 'next/link'

interface LinkButtonProps {
    title: string;
    link?: string;
    styles?: string;
}

const LinkButton = ({
    title,
    link,
    styles = "",
}: LinkButtonProps) => {
    console.log("COMP: LinkButton")
    const wrapperStyles = `btn-text group relative hover:text-(--gray) w-fit transition-colors duration-300 ${styles}`

    // JSX CONTENT
    const CONTENT = (
        <>
            {title}
            <span
                className="absolute inset-y-0 my-auto h-px bg-(--gray) group-hover:left-0 group-hover:w-full right-0 w-0 transition-all duration-500 ease-in-out"
            />
        </>
    )

    if (link) {
        // Link Types
        const isInternal = link.startsWith('/') && !/^\/\//.test(link);
        const isExternal = /^(https?:)?\/\//.test(link);
        const isTelOrMail = link.startsWith('tel:') || link.startsWith('mailto:')

        if (isInternal) {
            return (
                <Link
                    href={link}
                    className={wrapperStyles}
                >
                    {CONTENT}
                </Link>
            )
        }

        if (isExternal || isTelOrMail) {
            return (
                <a
                    href={link}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={wrapperStyles}
                >
                    {CONTENT}
                </a>
            )
        }

    }

    // fallback disabled
    return (
        <span
            className={`${wrapperStyles} text-(--divider)! pointer-events-none`}
        >
            {title}
        </span>
    )
}

export default LinkButton;