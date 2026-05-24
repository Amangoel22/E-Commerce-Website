const express = require('express')
const router = express.Router()
const { protect, isAdmin } = require('../middleware/auth.middleware')
const {
  getStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/admin.controller')

// all admin routes need login + admin role
router.use(protect)
router.use(isAdmin)

router.get('/stats', getStats)
router.get('/orders', getAllOrders)
router.put('/orders/:id', updateOrderStatus)
router.get('/users', getAllUsers)
router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

module.exports = router