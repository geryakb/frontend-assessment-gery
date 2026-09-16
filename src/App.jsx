import { useState, useMemo } from 'react'
import { useProducts } from './hooks/useProducts'
import ProductTable from './components/ProductTable'
import TableSkeleton from './components/TableSkeleton'
import FilterBar from './components/FilterBar'

function App() {
  const { products, isLoading, error } = useProducts()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category ? product.category === category : true
      const matchesStatus = status ? product.status === status : true
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [products, search, category, status])

  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))]
  }, [products])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Dashboard</h1>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
        categories={categories}
      />

      {isLoading ? <TableSkeleton /> : <ProductTable products={filteredProducts} />}
    </div>
  )
}

export default App