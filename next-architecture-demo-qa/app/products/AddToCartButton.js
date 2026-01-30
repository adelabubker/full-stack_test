"use client"; // This is a client component

import { useCart } from "../CartContext";   // We summon useCart from CartContext // Custom Hook

export default function AddToCartButton({ product }) {  
    const cart = useCart();

    if (!product || !cart?.addItem) return null; // Guard clause to ensure product and addItem exist

    const { addItem } = cart;

    const handleAdd = () => addItem(product); //When called ➜ it adds the current product to the cart.

    return ( // Render a button that, when clicked, adds the product to the cart
        <button
            onClick={handleAdd}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
            Add to Cart
        </button>
    );
}
