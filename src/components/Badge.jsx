const COLORS = {
    'In Stock': 'bg-green-100 text-green-700',
    'Out of Stock': 'bg-red-100 text-red-700',
    Electronics: 'bg-blue-100 text-blue-700',
    'Home & Kitchen': 'bg-amber-100 text-amber-700',
    Apparel: 'bg-purple-100 text-purple-700',
}

function Badge({ label }) {
    const colorClass = COLORS[label] || 'bg-gray-100 text-gray-700'
    return (
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
            {label}
        </span>
    )
}

export default Badge