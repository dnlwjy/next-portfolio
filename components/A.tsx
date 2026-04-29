import Link from 'next/link'

interface AProps {
  title: string;
  link?: string;
  styles?: string;
}

const A = ({
  title,
  link = "#",
  styles = ""
}: AProps) => {
  const wrapperStyles = `group inline-block relative ${styles}`
  const isExternal = link ? /^(https?:)?\/\//.test(link) : false;

  // JSX CONTENT
  const CONTENT = (
    <>
      {title}
      <span
        className="absolute inset-y-0 my-auto h-0.5 bg-(--gray) group-hover:left-0 group-hover:w-full right-0 w-0 transition-all duration-400 ease-in-out pointer-events-none"
      />
    </>
  )

  if (isExternal) {
    return (
      <a
        href={link}
        target={"_blank"}
        rel="noopener noreferrer"
        className={wrapperStyles}
      >
        {CONTENT}
      </a>
    );
  }

  return (
    <Link
      href={link}
      className={wrapperStyles}
    >
      {CONTENT}
    </Link>
  )
}

export default A;