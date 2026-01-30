import Link from "next/link";
import CartSummary from "./CartSummary";

export default function Home() {
    return (
        <main className="grid gap-4 p-4">
            <h1 className="text-2xl font-bold">Home</h1>

            <CartSummary />

            <Link
                href="/products"
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Go to Products
            </Link>
        </main>
    );
}
