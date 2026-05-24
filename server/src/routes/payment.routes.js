const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth.middleware')
const { createOrder, verifyPayment } = require('../controllers/payment.controller')

router.use(protect)
router.post('/create-order', createOrder)
router.post('/verify', verifyPayment)

module.exports = router