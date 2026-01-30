"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    function addItem(product) {
        if (!product?.id) throw new Error("Product must have an id");
        setItems((prev) => {
            const found = prev.find((x) => x.id === product.id);
            if (found) {
                return prev.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    }

    function clear() {
        setItems([]);
    }

    const value = useMemo(() => ({ items, addItem, clear }), [items]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}
