import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=12");
    const data = await res.json();

    return NextResponse.json({ products: data.products });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
