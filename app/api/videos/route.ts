import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Video from "@/models/Video";
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
    if (category && category !== "All") {
      query.category = category;
    }
    if (tag) {
      query.tags = tag;
    }
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    let dbQuery = Video.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      dbQuery = dbQuery.limit(parseInt(limit));
    }

    const videos = await dbQuery.exec();
    return NextResponse.json({ videos });
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
    const { title, description, category, tags, videoUrl, command, codeSnippet, thumbnailUrl, content, configurations } = body;

    if (!title || !description || !videoUrl) {
      return NextResponse.json({ error: "Title, description, and Video URL are required" }, { status: 400 });
    }

    await connectToDatabase();

    const video = await Video.create({
      title,
      description,
      category: category || "Uncategorized",
      tags: tags || [],
      videoUrl,
      command: command || "",
      codeSnippet: codeSnippet || "",
      thumbnailUrl: thumbnailUrl || "",
      content: content || "",
      configurations: configurations || [],
    });

    return NextResponse.json({ success: true, video }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
