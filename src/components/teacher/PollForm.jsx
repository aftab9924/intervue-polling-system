import React, { useState } from 'react';

const PollForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [expectedStudents, setExpectedStudents] = useState(2);
  const [error, setError] = useState('');

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    const trimmedOptions = options.map((opt) => opt.trim()).filter(Boolean);

    if (!question.trim()) {
      return setError('Question is required.');
    }

    if (trimmedOptions.length < 2) {
      return setError('At least 2 valid options are required.');
    }

    if (!expectedStudents || expectedStudents < 1) {
      return setError('Expected students must be at least 1.');
    }

    setError('');
    onSubmit({ question, options: trimmedOptions, expectedStudents });
    setQuestion('');
    setOptions(['', '']);
    setExpectedStudents(2);
  };

  return (
    <div className="p-4 bg-white border rounded shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Create a New Poll</h2>

      <div>
        <label className="block font-medium">Question</label>
        <input
          type="text"
          className="mt-1 w-full border p-2 rounded"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Options</label>
        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center mb-2">
            <input
              type="text"
              className="flex-grow border p-2 rounded"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(idx)}
                className="ml-2 text-red-500"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {options.length < 5 && (
          <button
            type="button"
            onClick={addOption}
            className="text-blue-600 underline text-sm mt-1"
          >
            + Add Option
          </button>
        )}
      </div>

      <div>
        <label className="block font-medium">Expected Students</label>
        <input
          type="number"
          className="mt-1 w-32 border p-2 rounded"
          min="1"
          value={expectedStudents}
          onChange={(e) => setExpectedStudents(Number(e.target.value))}
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Start Poll
      </button>
    </div>
  );
};

export default PollForm;
