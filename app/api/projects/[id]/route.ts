import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Project from "@/models/Project";
import { getSession } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const project = await Project.findById(id);
    
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    
    return NextResponse.json({ project });
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

    const project = await Project.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
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

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
