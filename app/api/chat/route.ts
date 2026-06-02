import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Message from "@/models/Message";
import User from "@/models/User";
import { getSession } from "@/lib/auth";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const otherUserId = searchParams.get("userId");

    await connectToDatabase();

    let query: any = {};

    if (session.role === "root") {
      // Root viewing specific user
      if (otherUserId) {
        query = {
          $or: [
            { senderId: session.id, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: session.id }
          ]
        };
      } else {
        // Root viewing all their messages or distinct conversations
        // Actually, for root, they might want to fetch all users who messaged them
        const users = await User.find({ role: 'user' }).select('name email _id');
        const usersWithUnread = await Promise.all(users.map(async (u) => {
          const unreadCount = await Message.countDocuments({
            senderId: u._id,
            receiverId: new mongoose.Types.ObjectId(session.id as string),
            read: false
          });
          return { ...u.toObject(), unreadCount };
        }));
        return NextResponse.json({ users: usersWithUnread });
      }
    } else {
      // Normal user, find root user
      const rootUser = await User.findOne({ role: "root" });
      if (!rootUser) {
        return NextResponse.json({ messages: [] }); // No root to chat with yet
      }
      query = {
        $or: [
          { senderId: session.id, receiverId: rootUser._id },
          { senderId: rootUser._id, receiverId: session.id }
        ]
      };
    }

    const messages = await Message.find(query).sort({ createdAt: 1 }).populate("senderId", "name role");
    return NextResponse.json({ messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, receiverId } = await req.json();
    if (!content) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    await connectToDatabase();

    let finalReceiverId = receiverId;

    // If user doesn't pass receiverId (normal user sending to root), find root
    if (!finalReceiverId) {
      if (session.role === "root") {
        return NextResponse.json({ error: "Root must specify receiver" }, { status: 400 });
      }
      const rootUser = await User.findOne({ role: "root" });
      if (!rootUser) {
        return NextResponse.json({ error: "System unavailable" }, { status: 400 });
      }
      finalReceiverId = rootUser._id;
    }

    const message = await Message.create({
      senderId: new mongoose.Types.ObjectId(session.id as string),
      receiverId: new mongoose.Types.ObjectId(finalReceiverId as string),
      content
    });

    const populatedMessage = await message.populate("senderId", "name role");

    return NextResponse.json({ success: true, message: populatedMessage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
