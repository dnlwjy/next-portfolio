interface TagProps {
    title: string;
    styles?: string;
}

const Tag = ({
    title,
    styles = "",
}: TagProps) => (
    <li
        className={`tag flex text-(--bodytext) items-center px-2 h-7 border border-(--divider) list-none ${styles}`}
    >
        {title}
    </li>
)

export default Tag;