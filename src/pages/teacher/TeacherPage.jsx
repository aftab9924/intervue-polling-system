import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../socket';
import { setPoll, setResults } from '../../store/pollSlice';

import PollForm from '../../components/teacher/PollForm';
import LiveResults from '../../components/teacher/LiveResults';

const TeacherPage = () => {
  const dispatch = useDispatch();
  const poll = useSelector((state) => state.poll.currentPoll);
  const results = useSelector((state) => state.poll.results);

  const [students, setStudents] = useState([]); // Optional: Live student list

  useEffect(() => {
    socket.on('pollStarted', (pollData) => {
      dispatch(setPoll(pollData));
      dispatch(setResults(null));
    });

    socket.on('pollUpdate', (res) => {
      dispatch(setResults(res));
    });

    socket.on('pollEnded', () => {
      dispatch(setPoll(null));
    });

    socket.on('studentList', (studentList) => {
      setStudents(studentList);
    });

    return () => {
      socket.off('pollStarted');
      socket.off('pollUpdate');
      socket.off('pollEnded');
      socket.off('studentList');
    };
  }, [dispatch]);

  const handleStartPoll = (pollData) => {
    socket.emit('newPoll', pollData);
  };

  const handleKick = (studentName) => {
    socket.emit('kickStudent', studentName);
  };

  const handleEndPoll = () => {
    socket.emit('endPoll');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>

      {!poll && (
        <PollForm onSubmit={handleStartPoll} />
      )}

      {poll && (
        <>
          <LiveResults results={results} poll={poll} />
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Connected Students</h2>
            {students.length === 0 && (
              <p className="text-gray-500">No students currently connected.</p>
            )}
            <ul className="space-y-2">
              {students.map((student) => (
                <li
                  key={student}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span>{student}</span>
                  <button
                    onClick={() => handleKick(student)}
                    className="bg-red-500 text-white px-3 py-1 text-sm rounded"
                  >
                    Kick
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleEndPoll}
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              End Poll
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherPage;
