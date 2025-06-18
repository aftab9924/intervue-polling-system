import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../socket';
import { setPoll, setResults, setKicked } from '../../store/pollSlice';
import { setName } from '../../store/userSlice';

import NameEntry from '../../components/student/NameEntry';
import QuestionDisplay from '../../components/student/QuestionDisplay';
import ResultChart from '../../components/student/ResultChart';

const StudentPage = () => {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.user.name);
  const poll = useSelector((state) => state.poll.currentPoll);
  const results = useSelector((state) => state.poll.results);
  const kicked = useSelector((state) => state.poll.kicked);

  const [hasAnswered, setHasAnswered] = useState(false);

  //  IDENTIFY ON CONNECT 

  useEffect(() => {
    if (name) {
      socket.emit('identify', name);
    }
  }, [name]);

  // SOCKET LISTENERS
  useEffect(() => {
    socket.on('pollStarted', (pollData) => {
      dispatch(setPoll(pollData));
      dispatch(setResults(null));
      setHasAnswered(false);
    });

    socket.on('pollEnded', (finalResults) => {
      dispatch(setResults(finalResults));
    });

    socket.on('kicked', () => {
      dispatch(setKicked(true));
    });

    return () => {
      socket.off('pollStarted');
      socket.off('pollEnded');
      socket.off('kicked');
    };
  }, [dispatch]);

  //  HANDLE ANSWER 

  const handleAnswerSubmit = (selectedAnswer) => {
    socket.emit('submitAnswer', {
      student: name,
      answer: selectedAnswer,
    });
    setHasAnswered(true);
  };

  //  CONDITIONAL RENDERING 

  if (kicked) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-xl font-bold">
        You have been kicked out by the teacher.
      </div>
    );
  }

  if (!name) {
    return <NameEntry onSave={(value) => dispatch(setName(value))} />;
  }

  if (results) {
    return <ResultChart data={Object.values(results)} />;
  }

  if (poll && !hasAnswered) {
    return (
      <QuestionDisplay
        poll={poll}
        onAnswer={handleAnswerSubmit}
        name={name}
      />
    );
  }

  return (
    <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
      Waiting for poll or result...
    </div>
  );
};

export default StudentPage;
