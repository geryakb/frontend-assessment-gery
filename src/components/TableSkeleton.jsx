function TableSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
            ))}
        </div>
    )
}

export default TableSkeleton