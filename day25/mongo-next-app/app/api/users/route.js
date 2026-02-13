import connectDB from "@/lib/mongodb";
import User from "@/models/User";

connectDB();

export async function GET() {
  const users = await User.find();
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const user = await User.create(data);
  return new Response(JSON.stringify(user), { status: 201 });
}
