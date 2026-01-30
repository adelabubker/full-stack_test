"use client"; // This is a client component

import AddToCartButton from "./AddToCartButton"; // We summon AddToCartButton component 

export default function ProductCard({ product }) {
    if (!product) return null;

    return (
        <div className="border border-gray-300 rounded-lg p-3 grid gap-2"> {/* using Tailwind CSS for styling */}
            <strong>{product.name}</strong>
            <span>
                Price:{" "}
                {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "JOD",
                }).format(product.price)}
            </span>

            <AddToCartButton product={product} />
        </div>
    );
}
