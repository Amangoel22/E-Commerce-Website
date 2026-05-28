import axiosInstance from './axiosInstance'

export const getProducts = async (category) => {
    return axiosInstance.get('/products', { params: { category } })
}

export const getProductById = async (id) => {
        return axiosInstance.get(`/products/${id}`)
}

export const searchProducts = async (query) => {
    return axiosInstance.get('/products/search', { params: { q: query } })
}
