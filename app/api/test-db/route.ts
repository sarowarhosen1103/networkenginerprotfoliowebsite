import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Check connection state
    const state = mongoose.connection.readyState;
    const states = {
      0: "Disconnected",
      1: "Connected",
      2: "Connecting",
      3: "Disconnecting",
    };
    
    return NextResponse.json({ 
      status: "success", 
      message: "Successfully connected to MongoDB!",
      connectionState: states[state as keyof typeof states] || "Unknown"
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { 
        status: "error", 
        message: "Failed to connect to MongoDB", 
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}
