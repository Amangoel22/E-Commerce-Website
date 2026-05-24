import axiosInstance from './axiosInstance'

export const getProducts = async (category) => {
    // GET /products?category=electronics
    return axiosInstance.get('/products', { params: { category } })
}

export const getProductById = async (id) => {
    // GET /products/:id
        return axiosInstance.get(`/products/${id}`)
}

export const searchProducts = async (query) => {
    // GET /products/search?q=headphones
    return axiosInstance.get('/products/search', { params: { q: query } })
}
