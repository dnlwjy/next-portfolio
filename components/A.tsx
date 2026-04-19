interface AProps {
  title: string;
  link: string;
  styles?: string;
}

const A = ({
  title,
  link,
  styles = ""
}: AProps) => {
  return (
    <a
      href={link}
      className={`group inline-block relative text-(--white) hover:text-(--gray) transition-colors duration-300 ease-in-out ${styles}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
      <span
        className="absolute inset-y-0 my-auto h-0.5 bg-(--gray) group-hover:left-0 group-hover:w-full right-0 w-0 transition-all duration-400 ease-in-out"
      />
    </a>
  );
}

export default A;