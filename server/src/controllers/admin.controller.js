const prisma = require('../lib/prisma')

// GET /admin/stats - dashboard numbers
const getStats = async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalOrders, revenueData] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: 'PAID' }
      })
    ])

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: revenueData._sum.total || 0
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET /admin/orders - all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
        items: { include: { product: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// PUT /admin/orders/:id - update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status }
    })
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET /admin/users - all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: { select: { orders: true } }
      }
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// POST /admin/products - create product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, originalPrice, discount, stock, category, images } = req.body
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        originalPrice: parseFloat(originalPrice),
        discount: parseInt(discount),
        stock: parseInt(stock),
        category,
        images: Array.isArray(images) ? images : [images]
      }
    })
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// PUT /admin/products/:id - update product
const updateProduct = async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// DELETE /admin/products/:id - delete product
const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } })
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = {
  getStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  createProduct,
  updateProduct,
  deleteProduct
}