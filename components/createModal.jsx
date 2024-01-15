// CreateDocumentModal.js

import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root'); // Make sure to set the root element for accessibility

const CreateModal = ({ isOpen, onRequestClose, onCreateDocument }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateDocument = async () => {
    try {
      setLoading(true);
      // Make an API call to create the document
      const response = await fetch('http://localhost:3000/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to create document');
      }

      // Assuming the API returns the created document
      const createdDocument = await response.json();
      onCreateDocument(createdDocument);
      setTitle('');
      setContent('');
      onRequestClose();
    } catch (error) {
      console.error('Error creating document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Create Document Modal"
    >
      <h2>Create Document</h2>
      <form>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleCreateDocument} disabled={loading}>
          {loading ? 'Creating...' : 'Create Document'}
        </button>
      </form>
    </Modal>
  );
};

export default CreateModal;
