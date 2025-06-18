import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  const handleContinue = () => {
    if (role === 'student') navigate('/student');
    else if (role === 'teacher') navigate('/teacher');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="text-sm text-purple-600 font-semibold mb-2">🎓 Intervue Poll</div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome to the <span className="font-bold">Live Polling System</span>
        </h1>
        <p className="text-gray-500 mt-2 mb-8">
          Please select the role that best describes you to begin using the live polling system
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <div
            onClick={() => setRole('student')}
            className={`flex-1 border rounded-lg p-4 cursor-pointer transition ${
              role === 'student' ? 'border-purple-600 shadow-md' : 'border-gray-200'
            }`}
          >
            <h2 className="font-semibold text-gray-800 mb-2">I’m a Student</h2>
            <p className="text-sm text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
          <div
            onClick={() => setRole('teacher')}
            className={`flex-1 border rounded-lg p-4 cursor-pointer transition ${
              role === 'teacher' ? 'border-purple-600 shadow-md' : 'border-gray-200'
            }`}
          >
            <h2 className="font-semibold text-gray-800 mb-2">I’m a Teacher</h2>
            <p className="text-sm text-gray-500">
              Submit answers and view live poll results in real-time.
            </p>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!role}
          className={`px-6 py-2 rounded-full font-medium text-white transition ${
            role ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-300 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
