type SEOProps = {
  title: string
  description: string
  image?: string
  url?: string
}

export function generateSEO({
  title,
  description,
  image = "/og-default.jpg",
  url = "",
}: SEOProps) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}