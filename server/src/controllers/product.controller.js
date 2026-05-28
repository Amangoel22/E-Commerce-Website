const prisma = require('../lib/prisma')

const getProducts = async (req, res) => {
  try {
    const { category } = req.query

    const products = category && category !== 'all'
  ? await prisma.product.findMany({
      where: { category },
      select: {
        id: true,
        name: true,
        price: true,
        originalPrice: true,
        discount: true,
        rating: true,
        category: true,
        images: true,
        description: true,
        stock: true
      }
    })
  : await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        originalPrice: true,
        discount: true,
        rating: true,
        category: true,
        images: true,
        description: true,
        stock: true
      }
    })

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

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