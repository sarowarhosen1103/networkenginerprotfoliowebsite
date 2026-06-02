import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";
import { getSession } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session || session.role !== "root") {
      return NextResponse.json({ error: "Unauthorized. Root access required." }, { status: 401 });
    }

    const body = await req.json();
    const { name, type } = body;

    await connectToDatabase();

    const category = await Category.findByIdAndUpdate(
      id,
      { name, type },
      { new: true, runValidators: true }
    );

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session || session.role !== "root") {
      return NextResponse.json({ error: "Unauthorized. Root access required." }, { status: 401 });
    }

    await connectToDatabase();

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
