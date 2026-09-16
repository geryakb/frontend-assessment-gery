import { useProducts } from './hooks/useProducts'
import ProductTable from './components/ProductTable'
import TableSkeleton from './components/TableSkeleton'

function App() {
  const { products, isLoading, error } = useProducts()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Dashboard</h1>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {isLoading ? <TableSkeleton /> : <ProductTable products={products} />}
    </div>
  )
}

export default App