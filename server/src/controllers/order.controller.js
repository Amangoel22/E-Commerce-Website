const prisma = require('../lib/prisma')

// POST /orders - place order from cart
const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    })

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0)

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: 'PAID',
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      },
      include: { items: { include: { product: true } } }
    })

    // clear the cart after order
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })

    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET /orders - get user's order history
const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET /orders/:id - get single order
const getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: { include: { product: true } } }
    })

    if (!order) return res.status(404).json({ message: 'Order not found' })
    if (order.userId !== req.user.userId) return res.status(403).json({ message: 'Not authorized' })

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { createOrder, getOrders, getOrderById }