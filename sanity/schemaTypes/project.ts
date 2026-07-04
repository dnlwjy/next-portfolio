import { defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { LINK_EXTERNAL_ONLY } from "./about";

export const caseStudy = defineType({
    name: "projects",
    title: "Case Studies",
    type: "document",
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "projects" }),
        { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
        { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
        { name: "featured", title: "Featured", type: "boolean", initialValue: false, description: "Highlight this case study on the homepage" },

        {
            name: "role",
            title: "Role",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "year",
            title: "Year",
            type: "number",
            validation: (Rule) =>
                Rule.required().min(2020).max(new Date().getFullYear()),
        },
        {
            name: "client",
            title: "Client",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "website",
            title: "Website",
            type: "url",
            validation: LINK_EXTERNAL_ONLY,
        },

        { name: "description", title: "Description", type: "text", validation: (Rule) => Rule.required() },
        { name: "coverImage", title: "Cover Image", type: "image", description: "Used for social media preview (recommended 1200x630)" },
        {
            name: "content", title: "Content", type: "array", of: [
                {
                    type: "block",
                    marks: {
                        annotations: [
                            {
                                name: "link",
                                title: "Link",
                                type: "object",
                                fields: [
                                    {
                                        name: "href",
                                        title: "URL",
                                        type: "url",
                                        validation: (Rule) =>
                                            Rule.uri({
                                                allowRelative: true,
                                            }),
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
        },
        {
            name: "documentation", title: "Documentation", type: "array", of: [
                { type: "image" }
            ],
            options: { layout: "grid" },
        },
    ],
});