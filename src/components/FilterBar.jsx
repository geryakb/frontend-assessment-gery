function FilterBar({ search, onSearchChange, category, onCategoryChange, status, onStatusChange, categories }) {
    return (
        <div className="flex flex-wrap gap-3 mb-4">
            <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 min-w-[200px]"
            />

            <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
                <option value="">All Categories</option>
                {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
                <option value="">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
            </select>
        </div>
    )
}

export default FilterBar