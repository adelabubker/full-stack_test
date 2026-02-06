export default function ProductCard({ product }: any) {
  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} />
      <h2 className="font-bold text-lg mt-2">{product.title}</h2>
      <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
      <p className="mt-2 font-bold text-orange-400">${product.price}</p>
    </div>
  );
}
