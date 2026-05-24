const express = require('express')
const router = express.Router()
const { createOrder, getOrders, getOrderById } = require('../controllers/order.controller')
const { protect } = require('../middleware/auth.middleware')

router.use(protect)

router.post('/', createOrder)
router.get('/', getOrders)
router.get('/:id', getOrderById)

module.exports = router