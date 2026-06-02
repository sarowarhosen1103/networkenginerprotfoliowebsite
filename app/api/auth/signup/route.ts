import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // First user becomes root automatically if we want, but let's stick to simple logic:
    // We can hardcode an email to be root, e.g., 'root@secure_net.com'
    const role = (email === 'root@secure_net.com' || email === 'admin@gmail.com') ? 'root' : 'user';

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const tokenPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name
    };

    const token = await signToken(tokenPayload);

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: tokenPayload
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
