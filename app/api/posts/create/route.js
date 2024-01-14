import connect from "@/db";
import { NextResponse } from "next/server";
import Post from "@/models/Post";

export async function POST(request) {
    try {
    await connect();
    const data = await request.json();
  console.log(data);
    const post = await Post.create({title: data.title, description: data.description});
    return NextResponse.json({ post: post }, { status: 200 });
    } catch (error) {
        console.log(error);
    return NextResponse.json({ message: "MongoDB Connection Failed", error: error }, { status: 500 }); 
    }
    }