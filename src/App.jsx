import { useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import Modal from './components/Modal'

const API_URL = 'https://my-json-server.typicode.com/geryakb/frontend-assessment-gery/products'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const [modalType, setModalType] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('Network response was not ok')
        const data = await res.json()
        setProducts(data)
      } catch {
        setToast({ message: 'Network error, failed to load data.', type: 'error' })
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchProducts()
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [])

  const handleCreate = async (values) => {
    const previousProducts = [...products]
    const tempId = Date.now()
    const newProduct = {
      ...values,
      id: tempId,
      createdAt: new Date().toISOString()
    }

    setProducts([...products, newProduct])
    setModalType(null)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      })
      if (!res.ok) throw new Error('Create failed')

      const savedProduct = await res.json()
      setProducts(current => current.map(p => p.id === tempId ? savedProduct : p))
      showToast('Product created successfully')
    } catch {
      setProducts(previousProducts)
      showToast('Failed to create product. Changes rolled back.', 'error')
    }
  }

  const handleEdit = async (values) => {
    const previousProducts = [...products]
    const updatedProduct = { ...selectedProduct, ...values }

    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
    setModalType(null)

    try {
      const res = await fetch(`${API_URL}/${updatedProduct.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      if (!res.ok) throw new Error('Update failed')
      showToast('Product updated successfully')
    } catch {
      setProducts(previousProducts)
      showToast('Failed to update product. Changes rolled back.', 'error')
    }
  }

  const handleDelete = async (id) => {
    const previousProducts = [...products]
    setProducts(products.filter(p => p.id !== id))
    setModalType(null)

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Delete failed')
      showToast('Product deleted successfully')
    } catch {
      setProducts(previousProducts)
      showToast('Failed to delete product. Changes rolled back.', 'error')
    }
  }

  const openModal = (type, product = null) => {
    setSelectedProduct(product)
    setModalType(type)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredProducts = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = filterCategory ? p.category === filterCategory : true
    const matchStatus = filterStatus ? p.status === filterStatus : true
    return matchName && matchCategory && matchStatus
  })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <button
            onClick={() => openModal('create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            + Add Product
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Apparel">Apparel</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="border-b">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${product.status === 'In Stock'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{formatDate(product.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openModal('view', product)} className="text-blue-600 hover:underline">View</button>
                        <button onClick={() => openModal('edit', product)} className="text-indigo-600 hover:underline">Edit</button>
                        <button onClick={() => openModal('delete', product)} className="text-red-600 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalType === 'create' || modalType === 'edit'}
        onClose={() => setModalType(null)}
        title={modalType === 'create' ? 'Add Product' : 'Edit Product'}
      >
        {(modalType === 'create' || modalType === 'edit') && (
          <ProductForm
            initialProduct={selectedProduct}
            onSubmit={modalType === 'create' ? handleCreate : handleEdit}
            onCancel={() => setModalType(null)}
          />
        )}
      </Modal>

      <Modal
        isOpen={modalType === 'view'}
        onClose={() => setModalType(null)}
        title="Product Details"
      >
        {selectedProduct && (
          <div className="space-y-3 text-sm">
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Price:</strong> {formatPrice(selectedProduct.price)}</p>
            <p><strong>Status:</strong> {selectedProduct.status}</p>
            <p><strong>Created At:</strong> {formatDate(selectedProduct.createdAt)}</p>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={modalType === 'delete'}
        onClose={() => setModalType(null)}
        title="Confirm Delete"
      >
        {selectedProduct && (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Are you sure you want to delete <strong>{selectedProduct.name}</strong>?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(selectedProduct.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setModalType(null)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>

      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-sm text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
          }`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}