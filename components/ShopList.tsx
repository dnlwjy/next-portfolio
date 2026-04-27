'use client'

import { useState } from 'react'
import ShopCard from './ShopCard'
import Tag from './Tag'
import { Search } from './IconLibrary'

const SEARCH = <Search size={56} />
const CATEGORIES = ['All', 'Web Templates', 'Sheet Music', 'Others']

interface Items {
    _id: any,
    title: any,
    image: any,
    price: any,
    category: any,
    link: any,
    tags: any,
    styles?: string,
}

interface ShopListProps {
    items: Items[],
    hideFilters?: boolean,
    styles?: string,
}

const ShopList = ({
    items,
    hideFilters = false,
    styles = "",
}: ShopListProps) => {
    const [query, setQuery] = useState("")
    const [click, setClick] = useState("All")

    const filtered = items.filter((e) => {
        const matchesSearch =
            e.title.toLowerCase().includes(query.toLowerCase()) ||
            e.tags.some((tag: any) => tag.toLowerCase().includes(query.toLowerCase())) ||
            e.price.toString().includes(query)
        const matchesCategory = click === 'All' || e.category === click
        return matchesSearch && matchesCategory
    })

    return (
        <div className={`flex flex-col flex-1 gap-16 ${styles}`}>

            {/* Filter Tags */}
            {hideFilters ? null : (
                <ul role="tablist" className="flex flex-wrap justify-center gap-2 w-full">
                    {CATEGORIES.map((e) => (
                        <Tag
                            key={e}
                            title={e}
                            click={() => setClick(e)}
                            variant={click === e ? "active" : "default"}
                        />
                    ))}
                </ul>
            )}

            <div className="flex flex-col flex-1 gap-2">
                {/* Search Input */}
                {hideFilters ? null : (
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search items..."
                    />
                )}

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