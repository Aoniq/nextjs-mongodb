'use client';
import { useState, useEffect } from 'react'; // Added import
import Image from 'next/image';
import Link from 'next/link';
import { IoTrashBin } from "react-icons/io5";

async function getPosts() {
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' })
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

export default function Home() {
  const [posts, setPosts] = useState([]); // Updated state initialization

  const fetchAndSetPosts = async () => {
    const updatedPosts = await getPosts();
    setPosts(updatedPosts);
  };

  useEffect(() => {
    fetchAndSetPosts(); // Fetch posts on component mount
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      fetchAndSetPosts(); // Update posts after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: '',
    content: '',
  });

  const handleCreateDocument = async () => {
    try {
      // Make an API call to create the document
      const response = await fetch('http://localhost:3000/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDocument),
      });

      if (!response.ok) {
        throw new Error('Failed to create document');
      }

      // Assuming the API returns the created document
      const createdDocument = await response.json();
      setNewDocument({ title: '', content: '' }); // Clear the form fields
      setModalOpen(false); // Close the modal
      fetchAndSetPosts(); // Update posts after creation
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <button onClick={() => setModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Open Create Document Modal
        </button>
        <div>
          {/* Modal for creating a new document */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-md z-10">
                <h2 className="text-2xl font-bold mb-4">Create Document</h2>
                <form>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                      Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      name='title'
                      value={newDocument.title}
                      onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                      Description:
                    </label>
                    <textarea
                      id="description"
                      name='description'
                      value={newDocument.description}
                      onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCreateDocument}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Create Document
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
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
      ))}
    </main>
  );
}
