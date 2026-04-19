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
        <div className={`flex flex-col gap-2 p-4 sm:p-6 justify-center ${styles}`}>

            <p className="tag">{title}</p>

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
                <p className="text-(--white)">{subtitle}</p>
            )}
        </div>
    )
}

export default SubInfo;