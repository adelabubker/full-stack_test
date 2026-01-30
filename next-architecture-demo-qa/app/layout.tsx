import { CartProvider } from "./CartContext";

export const metadata = {
    title: "Next Architecture Demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="font-sans p-5">
                <CartProvider>{children}</CartProvider>
            </body>
        </html>
    );
}
