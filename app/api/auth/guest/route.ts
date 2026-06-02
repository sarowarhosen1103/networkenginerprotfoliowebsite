import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST() {
  try {
    await connectToDatabase();

    // Generate random guest credentials
    const randomHex = crypto.randomBytes(4).toString("hex").toUpperCase();
    const name = `GUEST_${randomHex}`;
    const email = `guest_${randomHex}@anon.net`;
    const password = crypto.randomBytes(16).toString("hex"); // Unused, but satisfies model if needed, wait password is not required in model but let's pass a dummy hash if we were hashing, but our User model has password?: string so we can omit it or pass empty.

    const user = await User.create({
      name,
      email,
      role: "user",
      // Omit password since it's optional in the interface, or just store something dummy.
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
      maxAge: 60 * 60 * 24 * 7, // 7 days for a guest session
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: tokenPayload
    });
  } catch (error: any) {
    console.error("Guest login error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
