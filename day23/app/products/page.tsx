
import ProductCard from "../components/ProductCard";

export const dynamic = "force-dynamic"; // SSR

async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=30", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default async function ProductsPage() {
  const data = await fetchProducts();

  return (
    <div>
      <h1 className="title">Products (SSR)</h1>
      <p className="text-gray-400 mb-8">Fetched server-side directly</p>

      <div className="grid">
        {data.products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
