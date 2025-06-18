import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg p-8 rounded text-center space-y-6 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-800">Who are you?</h1>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/student')}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            I am a Student
          </button>
          <button
            onClick={() => navigate('/teacher')}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            I am a Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
