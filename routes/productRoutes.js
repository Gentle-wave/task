const express = require('express');
const { getProducts, createProduct, deleteProduct,updateProduct } = require('../controller/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

module.exports = router;
