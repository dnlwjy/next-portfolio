interface SubInfoProps {
    title: string;
    variant?: keyof typeof variantSubInfo;
    subtitle: string;
    styles?: string;
}

const variantSubInfo = {
    default: "p-5 sm:p-6 border border-(--divider)",
    plain: "p-0",
}

const SubInfo = ({
    title,
    variant = "default",
    subtitle,
    styles = ""
}: SubInfoProps) => {
    const isExternal = /^(https?:)?\/\//.test(subtitle);

    return (
        <dl className={`flex flex-col gap-1 justify-center flex-1 ${variantSubInfo[variant]} ${styles}`}>

            <dt className="btn-text text-(--gray)">{title}</dt>

            {isExternal ? (
                <a
                    href={subtitle}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    className="text-(--white)"
                >
                    {subtitle}
                </a>
            ) : (
                <dd className="text-(--white)">{subtitle}</dd>
            )}
        </dl>
    )
}

export default SubInfo;