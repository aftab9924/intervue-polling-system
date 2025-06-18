import React, { useEffect, useState } from 'react';

const QuestionDisplay = ({ poll, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(60);
  const [submitted, setSubmitted] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timer === 0 && !submitted) {
      onAnswer(null); // auto-submit null if time out
      setSubmitted(true);
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, submitted, onAnswer]);

  const handleSubmit = () => {
    if (selected && !submitted) {
      onAnswer(selected);
      setSubmitted(true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md max-w-xl w-full">
        <h2 className="text-lg font-semibold mb-4">{poll.question}</h2>

        <div className="space-y-3">
          {poll.options.map((opt, idx) => (
            <div key={idx} className="flex items-center">
              <input
                type="radio"
                id={`option-${idx}`}
                name="pollOption"
                value={opt}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
                className="mr-2"
                disabled={submitted}
              />
              <label htmlFor={`option-${idx}`} className="text-gray-700">{opt}</label>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">Time left: <strong>{timer}s</strong></p>
          <button
            onClick={handleSubmit}
            disabled={!selected || submitted}
            className={`px-4 py-2 rounded text-white ${selected && !submitted ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
