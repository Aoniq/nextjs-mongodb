'use client';
import Image from 'next/image'
import Link from 'next/link';
import { IoTrashBin } from "react-icons/io5";

async function getPosts() {
  const res = await fetch('http://localhost:3000/api/posts', {cache: 'no-store'})
  const json = await res.json()
  return json.posts
}

const deletePost = async (id) => {
  await fetch('http://localhost:3000/api/posts/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
};

export default async function Home() {
  const posts = await getPosts()

  const handleDelete = async (id) => {
    await deletePost(id);
    // Optionally, you can refresh the posts after deletion
    // const updatedPosts = await getPosts();
    // setPosts(updatedPosts);
  };
  return (
    <main className="flex flex-col items-center justify-between p-24">
      {posts.map((post) => (
        <div key={post._id} className="flex flex-row gap-x-2 items-center justify-between p-4">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="text-2xl">{post.description}</p>
          <button
            onClick={() => handleDelete(post._id)}
            className="cursor-pointer text-white bg-red-500 p-4 rounded-md"
          >
            Delete
          </button>
        </div>
      ))
      }
    </main>
  )
}
