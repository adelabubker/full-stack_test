"use client";

import { useCart } from "./CartContext";

export default function CartSummary() {
    const { items, clear } = useCart();

    const totalQty = items.reduce((sum, x) => sum + x.qty, 0);
    const totalPrice = items.reduce((sum, x) => sum + x.price * x.qty, 0);

    return (
        <div className="p-3 border border-gray-300 rounded-md">
            <h3 className="m-0 text-lg font-semibold">Cart</h3>
            <p className="my-2">Total Items: {totalQty}</p>
            <p className="my-2">
                Total Price:{" "}
                {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "JOD",
                }).format(totalPrice)}
            </p>
            <button
                onClick={() => clear()}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Clear Cart
            </button>
        </div>
    );
}
