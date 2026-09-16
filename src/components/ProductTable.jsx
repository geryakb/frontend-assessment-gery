import { formatPrice, formatDate } from '../utils/format'
import Badge from './Badge'

function ProductTable({ products }) {
    return (
        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
                <tr>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Name</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Category</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Price</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-600">Created</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id} className="border-t border-gray-100">
                        <td className="p-3">{product.name}</td>
                        <td className="p-3"><Badge label={product.category} /></td>
                        <td className="p-3">{formatPrice(product.price)}</td>
                        <td className="p-3"><Badge label={product.status} /></td>
                        <td className="p-3 text-gray-500 text-sm">{formatDate(product.createdAt)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ProductTable