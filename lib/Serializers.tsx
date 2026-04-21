import { PortableTextComponents } from '@portabletext/react';
import { urlFor } from "@/sanity/lib/image";
import A from '../components/A'

const serializers: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-8">{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2 className='mt-12 mb-4'>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-4 py-3 border-l-4 font-inter text-[20px] border-darkgray bg-white/2 text-white">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => {
      return (
        <img
          src={urlFor(value).url()}
          alt={value.alt || "Project image"}
          className="w-full h-auto object-cover my-4 border border-(--divider)"
        />
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 mb-4"><p>{children}</p></ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 mb-4"><p>{children}</p></ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-0"><p>{children}</p></li>,
    number: ({ children }) => <li className="mb-0"><p>{children}</p></li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code className="bg-gray-800 px-1 py-0.5 rounded">{children}</code>,
    link: ({ value, children }) => (
      <A title={children as string} link={value?.href} />
    ),
  },
};

export default serializers;