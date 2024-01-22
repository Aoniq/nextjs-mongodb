import connect from "@/db";
import { NextResponse } from "next/server";
import Post from "@/models/Post";

export async function POST(request) {
  try {
    await connect();
    const data = await request.json();
    const { id, title, description } = data;

    const existingPost = await Post.findById(id);

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found", error: null }, { status: 404 });
    }

    existingPost.title = title;
    existingPost.description = description;
    const updatedPost = await existingPost.save();

    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "MongoDB Connection Failed", error }, { status: 500 });
  }
}