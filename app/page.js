'use client';
import { useState, useEffect } from 'react';

async function getPosts() {
  const res = await fetch('https://crud.jeffreyv.nl/api/posts', { cache: 'no-store' });
  const json = await res.json();
  return json.posts;
}

const deletePost = async (id) => {
  await fetch('https://crud.jeffreyv.nl/api/posts/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
};

const updatePost = async (id, updatedData) => {
  await fetch('https://crud.jeffreyv.nl/api/posts/update', {
    method: 'POST', // Use the appropriate HTTP method (PUT/PATCH) for updating
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...updatedData }),
  });
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: '',
    description: '',
  });
  const [selectedPostId, setSelectedPostId] = useState(null);

  const fetchAndSetPosts = async () => {
    const updatedPosts = await getPosts();
    setPosts(updatedPosts);
  };

  useEffect(() => {
    fetchAndSetPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      fetchAndSetPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdate = (id) => {
    setSelectedPostId(id);
    setModalOpen(true);
  };

  const handleCreateDocument = async () => {
    try {
      const response = await fetch('https://crud.jeffreyv.nl/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDocument),
      });

      if (!response.ok) {
        throw new Error('Failed to create document');
      }

      const createdDocument = await response.json();
      setNewDocument({ title: '', description: '' });
      setModalOpen(false);
      fetchAndSetPosts();
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  const handleUpdateDocument = async () => {
    try {
      // Check if the inputs are empty, and use the current values if they are
      const updatedData = {
        title: newDocument.title.trim() === '' ? posts.find(post => post._id === selectedPostId).title : newDocument.title,
        description: newDocument.description.trim() === '' ? posts.find(post => post._id === selectedPostId).description : newDocument.description,
      };
  
      await updatePost(selectedPostId, updatedData);
      setNewDocument({ title: '', description: '' });
      setModalOpen(false);
      setSelectedPostId(null);
      fetchAndSetPosts();
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  


  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <button onClick={() => setModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Create post
        </button>
        <div>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-md z-10">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedPostId ? 'Update Document' : 'Create Document'}
                </h2>
                <form>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                      Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
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
                      name="description"
                      value={newDocument.description}
                      onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={selectedPostId ? handleUpdateDocument : handleCreateDocument}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    {selectedPostId ? 'Update Document' : 'Create Document'}
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
            onClick={() => handleUpdate(post._id)}
            className="cursor-pointer text-white bg-yellow-400 p-3 rounded-md"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(post._id)}
            className="cursor-pointer text-white bg-red-500 p-3 rounded-md"
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}
