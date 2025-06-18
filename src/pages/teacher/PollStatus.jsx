import React from 'react';
import { useSelector } from 'react-redux';

const PollStatus = () => {
  const poll = useSelector((state) => state.poll.currentPoll);
  const results = useSelector((state) => state.poll.results);

  if (!poll) return null;

  const expected = poll.expectedStudents || 0;
  const answered = results ? Object.keys(results).length : 0;
  const remaining = expected - answered;

  return (
    <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded mb-4">
      <h2 className="font-semibold text-lg">Poll Status</h2>
      <p className="mt-1">
        <strong>Question:</strong> {poll.question}
      </p>
      <p className="mt-1">
        <strong>Students Answered:</strong> {answered} / {expected}
      </p>
      <p className="mt-1">
        <strong>Remaining:</strong> {remaining > 0 ? remaining : 0}
      </p>
    </div>
  );
};

export default PollStatus;
