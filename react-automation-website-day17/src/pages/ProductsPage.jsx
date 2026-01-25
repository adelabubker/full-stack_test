import { useEffect, useState } from "react";
import './ProductsPage.css';

function ProductsPage() {
  // ================== STATE LAYER ==================
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================== DATA FETCH ==================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/products");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data.products || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ================== UI RENDER ==================
  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">Our Products</h1>
        <p className="page-subtitle">Browse our collection of premium products</p>
        
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading products...</p>
          </div>
        )}
        
        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">Something went wrong</h2>
            <p className="error-message">Error: {error}</p>
            <button 
              className="retry-btn"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <div className="products-stats">
              <div className="stat-card">
                <span className="stat-number">{products.length}</span>
                <span className="stat-label">Total Products</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  ${products.reduce((sum, product) => sum + product.price, 0).toLocaleString()}
                </span>
                <span className="stat-label">Total Value</span>
              </div>
            </div>
            
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.thumbnail} alt={product.title} />
                    {product.discountPercentage > 0 && (
                      <span className="discount-badge">
                        -{product.discountPercentage}%
                      </span>
                    )}
                  </div>
                  <div className="product-content">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-brand">Brand: {product.brand}</p>
                    <p className="product-category">Category: {product.category}</p>
                    <p className="product-description">{product.description}</p>
                    <div className="product-rating">
                      <span className="stars">{"★".repeat(Math.round(product.rating))}</span>
                      <span className="rating-value">{product.rating}/5</span>
                      <span className="review-count">({product.reviews?.length || 0} reviews)</span>
                    </div>
                    <div className="product-footer">
                      <div className="price-container">
                        <span className="current-price">${product.price}</span>
                        {product.discountPercentage > 0 && (
                          <span className="original-price">
                            ${(product.price / (1 - product.discountPercentage/100)).toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="stock-info">
                        <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;