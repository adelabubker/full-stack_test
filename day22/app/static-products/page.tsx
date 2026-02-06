async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=6", {
    cache: "force-cache",
  });

  return res.json();
}

export default async function StaticPage() {
  const data = await getProducts();

  return (
    <div>
      <h1 className="title">Static Products (SSG)</h1>

      <div className="grid">
        {data.products.map((p: any) => (
          <div key={p.id} className="card">
            <h2 className="font-bold">{p.title}</h2>
            <p className="text-gray-400">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
