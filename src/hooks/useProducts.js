import { useState, useEffect } from 'react'

const API_URL = 'https://my-json-server.typicode.com/geryakb/frontend-assessment-gery/products'

export function useProducts() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(API_URL)
            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }
            const data = await response.json()
            setProducts(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return { products, isLoading, error, refetch: fetchProducts }
}