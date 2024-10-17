const express = require('express');
const { getCart, addToCart,removeFromCart,clearCart } = require('../controller/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getCart).post(protect, addToCart);
router.delete('/:productId', protect, removeFromCart);
router.delete('/clear/cart', protect, clearCart);


module.exports = router;
