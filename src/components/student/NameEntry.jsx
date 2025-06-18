import React, { useState } from 'react';

const NameEntry = ({ onSave }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Name is required.');
      return;
    }

    sessionStorage.setItem('studentName', trimmed);
    onSave(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 bg-white border rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Enter Your Name</h2>

        <input
          type="text"
          className="w-full border p-2 rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. John"
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default NameEntry;
