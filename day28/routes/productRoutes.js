import express from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

import { validateProduct } from '../middleware/validateProduct.js';

const router = express.Router();

router.post('/', validateProduct, createProduct);
router.get('/', getProducts);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

export default router;