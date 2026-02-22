import products from '../data/products.js';

// CREATE PRODUCT
export const createProduct = (req, res) => {
  const { name, price } = req.body;

  const newProduct = {
    id: Date.now().toString(),
    name,
    price,
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    data: newProduct,
  });
};

// GET ALL PRODUCTS
export const getProducts = (req, res) => {
  res.json({
    success: true,
    data: products,
  });
};

// UPDATE PRODUCT
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  product.name = name || product.name;
  product.price = price || product.price;

  res.json({
    success: true,
    data: product,
  });
};

// DELETE PRODUCT
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  products.splice(index, 1);

  res.json({
    success: true,
    message: 'Product deleted successfully',
  });
};