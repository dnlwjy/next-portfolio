import { defineType } from "sanity";

export const projects = defineType({
    name: "projects",
    title: "Projects",
    type: "document",
    orderings: [
        {
            title: 'Manual order',
            name: 'manualOrder',
            by: [
                { field: 'orderRank', direction: 'asc' }
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
        { name: "featured", title: "Featured", type: "boolean", initialValue: false, description: "Mark this project as featured" },

        { name: "role", title: "Role", type: "string", },
        { name: "year", title: "Year", type: "number", validation: (Rule) => Rule.min(2020).max(new Date().getFullYear()) },
        { name: "client", title: "Client", type: "string", },
        { name: "website", title: "Website", type: "url", validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }).error("Masukin yang bener bro"), },

        { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], validation: (Rule) => Rule.max(4), },
        { name: "description", title: "Description", type: "text" },
        { name: "content", title: "Content", type: "array", of: [
                { type: "block" },
                { type: "image" },
                { type: "object", name: "link", fields: [
                        { name: "text", type: "string", title: "Link Text" },
                        { name: "href", type: "url", title: "URL" },
                    ]},
            ],
        },
        { name: "documentation", title: "Documentation", type: "array", of: [
                { type: "block" },
                { type: "image" },
                { type: "object", name: "link", fields: [
                        { name: "text", type: "string", title: "Link Text" },
                        { name: "href", type: "url", title: "URL" },
                    ]},
            ],
        },
    ],
});