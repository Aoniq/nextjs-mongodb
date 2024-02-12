import connect from "@/db";
import { NextResponse } from "next/server";
import Post from "@/models/Post";
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request) {
    try {
    await connect();
    const posts = await Post.find();
    return NextResponse.json({ posts: posts }, { status: 200 }); 
    } catch (error) {
        console.log(error);
    return NextResponse.json({ message: "MongoDB Connection Failed", error: error }, { status: 500 }); 
    }
    };