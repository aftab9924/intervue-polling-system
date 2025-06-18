import React from 'react';

const PastPollsTable = ({ polls }) => {
  return (
    <div className="overflow-x-auto border rounded">
      <table className="w-full table-auto text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border-b">#</th>
            <th className="p-3 border-b">Question</th>
            <th className="p-3 border-b">Options</th>
            <th className="p-3 border-b">Total Votes</th>
            <th className="p-3 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {polls.map((poll, index) => {
            const totalVotes = poll.results ? Object.keys(poll.results).length : 0;
            return (
              <tr key={poll._id} className="hover:bg-gray-50">
                <td className="p-3 border-b text-gray-600">{index + 1}</td>
                <td className="p-3 border-b">{poll.question}</td>
                <td className="p-3 border-b">
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {poll.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 border-b text-center">{totalVotes}</td>
                <td className="p-3 border-b text-sm text-gray-500">
                  {new Date(poll.createdAt).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PastPollsTable;
