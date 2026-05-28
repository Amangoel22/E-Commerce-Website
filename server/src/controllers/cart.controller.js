const prisma = require('../lib/prisma')

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: { include: { product: true } } }
      })
    }

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId
    const { productId, quantity = 1 } = req.body

    let cart = await prisma.cart.findUnique({ where: { userId } })
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } })
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId }
    })

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      })
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity }
      })
    }

    const updatedCart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    })

    res.json(updatedCart)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params
    const { quantity } = req.body

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: itemId } })
    } else {
      await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity }
      })
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.userId },
      include: { items: { include: { product: true } } }
    })

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params
    await prisma.cartItem.delete({ where: { id: itemId } })

    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.userId },
      include: { items: { include: { product: true } } }
    })

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeFromCart }