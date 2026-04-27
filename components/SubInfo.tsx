interface SubInfoProps {
    title: string;
    subtitle: string;
    styles?: string;
}

const SubInfo = ({
    title,
    subtitle,
    styles = ""
}: SubInfoProps) => {
    const isExternal = /^(https?:)?\/\//.test(subtitle);

    return (
        <dl className={`flex flex-col gap-2 p-5 sm:p-6 justify-center flex-1 border border-(--divider) ${styles}`}>

            <dt className="tag">{title}</dt>

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