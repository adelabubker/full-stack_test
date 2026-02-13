import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";

connectDB();

export async function GET() {
  const orders = await Order.find().populate('user');
  return new Response(JSON.stringify(orders), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();

  const orders = await Order.insertMany(data);
  return new Response(JSON.stringify(orders), { status: 201 });
}

