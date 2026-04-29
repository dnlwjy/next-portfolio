import { defineType } from "sanity";

export const shop = defineType({
  name: "shop",
  title: "Shop",
  type: "document",
  orderings: [
    {
      title: 'Manual order',
      name: 'manualOrder',
      by: [
        {field: 'orderRank', direction: 'asc'}
      ]
    }
  ],
  fields: [
    {
      name: 'orderRank',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3, etc.)',
      validation: (Rule) => Rule.min(1).integer(),
      initialValue: 100,
    },
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "coverImage", title: "Cover Image", type: "image" },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Web Templates", value: "Web Templates" },
          { title: "Sheet Music", value: "Sheet Music" },
          { title: "Others", value: "Others" },
        ],
      },
    },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false, description: "Mark this item as featured" },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Additional images for this product (up to 3)",
      validation: (Rule) => Rule.max(3),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.min(0).error("Bro, harga masa bisa minus"),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(4),
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        { type: "image" },
        {
          type: "object",
          name: "link",
          fields: [
            { name: "text", type: "string", title: "Link Text" },
            { name: "href", type: "url", title: "URL" },
          ],
        },
      ],
    },
    {
      name: "checkout",
      title: "Checkout Link",
      type: "url",
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      }).error("Masukin yang bener bro"),
    },
    { name: "preview", title: "Preview", type: "url" },
  ],
});