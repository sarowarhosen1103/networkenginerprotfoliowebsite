import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Video from "@/models/Video";
import { getSession } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const video = await Video.findById(id);
    
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }
    
    return NextResponse.json({ video });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== "root") {
      return NextResponse.json({ error: "Unauthorized. Root access required." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    await connectToDatabase();

    const video = await Video.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, video });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== "root") {
      return NextResponse.json({ error: "Unauthorized. Root access required." }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const video = await Video.findByIdAndDelete(id);

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
