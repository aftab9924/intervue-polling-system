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
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-xl w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{poll.question}</h2>
        </div>

        <div className="space-y-4">
          {poll.options.map((opt, idx) => (
            <div
              key={idx}
              className={`border rounded-lg p-4 cursor-pointer transition flex items-center ${
                selected === opt ? 'border-purple-600 bg-purple-50 shadow' : 'border-gray-200'
              }`}
              onClick={() => !submitted && setSelected(opt)}
            >
              <input
                type="radio"
                id={`option-${idx}`}
                name="pollOption"
                value={opt}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
                className="mr-3"
                disabled={submitted}
              />
              <label htmlFor={`option-${idx}`} className="text-gray-800 cursor-pointer">
                {opt}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Time left: <strong>{timer}s</strong>
          </p>
          <button
            onClick={handleSubmit}
            disabled={!selected || submitted}
            className={`px-6 py-2 rounded-full font-medium text-white transition ${
              selected && !submitted ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
