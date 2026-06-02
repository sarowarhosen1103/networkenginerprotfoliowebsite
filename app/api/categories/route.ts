import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // project or video

    await connectToDatabase();

    // Check if categories count is zero, if so seed defaults
    const count = await Category.countDocuments();
    if (count === 0) {
      await Category.create([
        { name: "Routing & Switching", type: "project" },
        { name: "Firewalls & Security", type: "project" },
        { name: "Network Automation", type: "project" },
        { name: "Quantum Cryptography", type: "project" },
        { name: "Labs & Walkthroughs", type: "video" },
        { name: "System Demonstrations", type: "video" },
        { name: "Cyber Operations", type: "video" },
      ]);
    }

    const query: any = {};
    if (type) {
      query.type = type;
    }

    const categories = await Category.find(query).sort({ name: 1 });
    return NextResponse.json({ categories });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "root") {
      return NextResponse.json({ error: "Unauthorized. Root access required." }, { status: 401 });
    }

    const body = await req.json();
    const { name, type } = body;

    if (!name || !type) {
      return NextResponse.json({ error: "Name and type are required" }, { status: 400 });
    }

    if (type !== "project" && type !== "video") {
      return NextResponse.json({ error: "Invalid type. Must be 'project' or 'video'" }, { status: 400 });
    }

    await connectToDatabase();

    // Check for duplicate
    const existing = await Category.findOne({ name, type });
    if (existing) {
      return NextResponse.json({ error: "Category already exists for this type" }, { status: 400 });
    }

    const category = await Category.create({ name, type });
    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
