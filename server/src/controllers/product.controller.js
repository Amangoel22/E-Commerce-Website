const prisma = require('../lib/prisma')

// Get all products
const getProducts = async (req, res) => {
  try {
    const { category } = req.query

    const products = category && category !== 'all'
      ? await prisma.product.findMany({ where: { category } })
      : await prisma.product.findMany()

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params

    const product = await prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(product)
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Search products by name or description
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' })
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } }
        ]
      }
    })

    res.json(products)
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getProducts, getProductById, searchProducts }