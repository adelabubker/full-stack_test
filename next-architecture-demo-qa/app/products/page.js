"use client"; // This is a client component

import { useEffect, useState } from "react"; // We summon useEffect and useState from React
import CartSummary from "../CartSummary"; // We summon CartSummary component
import ProductCard from "./ProductCard";   // We summon ProductCard component

export default function ProductsPage() { // ركز هون 
    // create products page component
    const [products, setProducts] = useState([]); // state (products) to hold products

    useEffect(() => {  // fetch products from API on component mount
        fetch("/api/products") // from the products API route  ➜ /api/products
            .then((res) => res.json()) // Convert the response from JSON to an object.
            .then(setProducts) // Update state data with fetched products
            .catch((err) => console.error(err)); // Log any errors to the console
    }, []); // يشتغل مرة وحدة بس

    return (
        <main className="grid gap-4 p-4">
            <h1 className="text-2xl font-bold">Products</h1>

            <CartSummary />    {/* Render CartSummary component */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />  
                    // هضول مهمات 
                    // key={p.id} → Required for React reconciliation  
                    // product={p} → Passing product data to ProductCard 
                ))}
            </div>
        </main>
    );
}
