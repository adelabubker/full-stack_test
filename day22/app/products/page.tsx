// SSG = build time caching
async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=12", {
    cache: "force-cache", // static generation
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}

export default async function ProductsPage() {
  const data = await getProducts();

  return (
    <div>
      <h1 className="title">Static Products (SSG)</h1>

      <p className="text-gray-400 mb-10">
        Generated at build time • Ultra fast • SEO optimized
      </p>

      <div className="grid">
        {data.products.map((product: any) => (
          <div key={product.id} className="card">
            
            {/* product image */}
            <img
              src={product.thumbnail}
              alt={product.title}
            />

            {/* title */}
            <h2 className="font-bold text-lg mb-1">
              {product.title}
            </h2>

            {/* description */}
            <p className="text-gray-400 text-sm line-clamp-2">
              {product.description}
            </p>

            {/* price */}
            <div className="flex justify-between items-center mt-3">
              <span className="font-bold text-orange-400">
                ${product.price}
              </span>

              <span className="btn">View</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
