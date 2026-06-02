import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Project from "@/models/Project";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");

    await connectToDatabase();

    const query: any = {};
    if (category && category.toLowerCase() !== "all") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }
    if (tag) {
      query.tags = tag;
    }
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    let dbQuery = Project.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      dbQuery = dbQuery.limit(parseInt(limit));
    }

    const projects = await dbQuery.exec();
    return NextResponse.json({ projects });
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
    const { title, description, category, tags, command, codeSnippet, imageUrl, content, projectUrl, demoUrl, configurations } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    await connectToDatabase();

    const project = await Project.create({
      title,
      description,
      category: category || "Uncategorized",
      tags: tags || [],
      command: command || "",
      codeSnippet: codeSnippet || "",
      imageUrl: imageUrl || "",
      content: content || "",
      projectUrl: projectUrl || "",
      demoUrl: demoUrl || "",
      configurations: configurations || [],
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
