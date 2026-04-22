'use client'

import { useState } from 'react'
import ShopCard from './ShopCard'
import Tag from './Tag'
import { Search } from './IconLibrary'

const SEARCH = <Search size={56} />
const CATEGORIES = ['All', 'Web Templates', 'Sheet Music', 'Others']

interface ShopListProps {
    items: { _id: string; title: string; image: string; price: number; category: string; link: string; tags: string[] }[]
}

const ShopList = ({ items }: ShopListProps) => {
    const [query, setQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("All")

    const filtered = items.filter((e) => {
        const matchesSearch =
            e.title.toLowerCase().includes(query.toLowerCase()) ||
            e.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
            e.price.toString().includes(query)
        const matchesCategory = activeCategory === 'All' || e.category === activeCategory
        return matchesSearch && matchesCategory
    })

    return (
        <div className="flex flex-col flex-1 gap-6">

            {/* Filter Tags */}
            <ul role="tablist" className="flex flex-wrap justify-center gap-2 w-full">
                {CATEGORIES.map((e) => (
                    <Tag
                        key={e}
                        title={e}
                        click={() => setActiveCategory(e)}
                        variant={activeCategory === e ? "active" : "default"}
                    />
                ))}
            </ul>

            <div className="flex flex-col flex-1 gap-2">
                {/* Search Input */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search items..."
                />

                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {filtered.map((e) => (
                        <ShopCard
                            key={e._id}
                            title={e.title}
                            image={e.image}
                            price={e.price}
                            link={e.link}
                        />
                    ))}
                </div>
                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-4 h-150">
                        {SEARCH}
                        <span>No items found {query ? `for "${query}"` : ""}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShopList