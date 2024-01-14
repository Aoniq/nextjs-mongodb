import connect from "@/db";
import { NextResponse } from "next/server";
import Post from "@/models/Post";

export async function POST(request) {
    try {
        await connect();
        const data = await request.json();
        console.log(data);
        const { id = '' } = data;

        // No need to convert 'id' to ObjectId as it's already a string
        await Post.findByIdAndDelete(id);

        // return to previous page
        return NextResponse.redirect(request.headers.get("referer"), { status: 303 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "MongoDB Connection Failed", error: error }, { status: 500 }); 
    }
}
