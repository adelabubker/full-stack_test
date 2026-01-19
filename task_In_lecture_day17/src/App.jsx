import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // state للمنتجات
  const [products, setProducts] = useState([])

  // جلب المنتجات من API
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        console.log(data); // في الكونسول
        setProducts(data.products); // حفظ للعرض في الصفحة
      });
  }, [])

  return (
    <div className="app">
      <h1>قائمة المنتجات</h1>
      
      <div className="products-section">
        <h2>المنتجات ({products.length} منتج)</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <h3 className="product-title">{product.title}</h3>
              <div className="product-price">${product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App