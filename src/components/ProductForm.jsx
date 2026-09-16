import { useProductForm } from '../hooks/useProductForm'

const CATEGORIES = ['Electronics', 'Home & Kitchen', 'Apparel']

function ProductForm({ initialProduct, onSubmit, onCancel, isSubmitting }) {
    const { values, errors, touched, isValid, handleChange, handleBlur } = useProductForm(initialProduct)

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(values)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                {touched.name && errors.name && (
                    <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    value={values.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    onBlur={() => handleBlur('category')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                {touched.category && errors.category && (
                    <p className="text-red-600 text-xs mt-1">{errors.category}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                    type="number"
                    value={values.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    onBlur={() => handleBlur('price')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                {touched.price && errors.price && (
                    <p className="text-red-600 text-xs mt-1">{errors.price}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                    value={values.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>
            </div>

            <div className="flex gap-2 pt-2">
                <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Saving...' : 'Save'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default ProductForm