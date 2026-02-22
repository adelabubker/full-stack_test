export const validateProduct = (req, res, next) => {
  const { name, price } = req.body;
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push('Name is required');
  }

  if (!price || isNaN(price)) {
    errors.push('Valid price is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input',
      errors,
    });
  }

  next();
};