import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

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
    console.error("Login error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
