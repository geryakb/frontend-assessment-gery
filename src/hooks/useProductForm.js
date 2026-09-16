import { useState } from 'react'

const initialValues = {
    name: '',
    category: '',
    price: '',
    status: 'In Stock',
}

function validate(values) {
    const errors = {}

    if (!values.name.trim()) {
        errors.name = 'Name is required'
    }

    if (!values.category) {
        errors.category = 'Category is required'
    }

    const priceNumber = Number(values.price)
    if (values.price === '' || isNaN(priceNumber)) {
        errors.price = 'Price must be a number'
    } else if (priceNumber <= 0) {
        errors.price = 'Price must be greater than 0'
    }

    return errors
}

export function useProductForm(initialProduct = null) {
    const [values, setValues] = useState(initialProduct || initialValues)
    const [touched, setTouched] = useState({})

    const errors = validate(values)
    const isValid = Object.keys(errors).length === 0

    function handleChange(field, value) {
        setValues((prev) => ({ ...prev, [field]: value }))
    }

    function handleBlur(field) {
        setTouched((prev) => ({ ...prev, [field]: true }))
    }

    function reset() {
        setValues(initialProduct || initialValues)
        setTouched({})
    }

    return { values, errors, touched, isValid, handleChange, handleBlur, reset }
}