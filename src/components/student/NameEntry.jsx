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
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md w-full">
        <div className="text-sm text-purple-600 font-semibold mb-2">🎓 Intervue Poll</div>
        <h1 className="text-3xl font-bold mb-2">
          Let’s <span className="text-black">Get Started</span>
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          If you’re a student, you’ll be able to <span className="font-medium">submit your answers</span>, participate in live polls, and see how your responses compare with your classmates.
        </p>

        <div className="text-left">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Enter your Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g. John"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-purple-600 text-white py-2 rounded-full font-medium hover:bg-purple-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default NameEntry;
