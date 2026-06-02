import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const secretKey = process.env.JWT_SECRET || "super_secret_cyber_shield_key_2026";
const key = new TextEncoder().encode(secretKey);

export async function signToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession(req?: NextRequest) {
  let token = null;
  
  if (req) {
    token = req.cookies.get("token")?.value;
  } else {
    // If running in server action or async server component
    const cookieStore = await cookies();
    token = cookieStore.get("token")?.value;
  }
  
  if (!token) return null;
  return await verifyToken(token);
}
