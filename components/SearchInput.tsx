'use client'

import { useState } from 'react'

const SearchInput = () => {
    const [query, setQuery] = useState("")

    return (
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items..."
        />
    )
}

export default SearchInput;