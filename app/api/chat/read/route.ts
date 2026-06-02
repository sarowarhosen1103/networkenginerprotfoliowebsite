import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Message from "@/models/Message";
import { getSession } from "@/lib/auth";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { senderId } = await req.json();
    if (!senderId) {
      return NextResponse.json({ error: "Sender ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    // Mark all messages SENT BY senderId and RECEIVED BY session.id as read
    await Message.updateMany(
      { 
        senderId: new mongoose.Types.ObjectId(senderId), 
        receiverId: new mongoose.Types.ObjectId(session.id as string), 
        read: false 
      },
      { $set: { read: true } }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
