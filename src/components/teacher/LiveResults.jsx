import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const LiveResults = ({ poll, results }) => {
  if (!poll || !results) return null;

  const voteCounts = poll.options.reduce((acc, option) => {
    acc[option] = 0;
    return acc;
  }, {});

  // Tally votes
  Object.values(results).forEach((answer) => {
    // eslint-disable-next-line no-prototype-builtins
    if (voteCounts.hasOwnProperty(answer)) {
      voteCounts[answer] += 1;
    }
  });

  const data = {
    labels: Object.keys(voteCounts),
    datasets: [
      {
        label: 'Votes',
        data: Object.values(voteCounts),
        backgroundColor: '#3b82f6',
        borderRadius: 5,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  return (
    <div className="bg-white border p-4 rounded shadow mb-4">
      <h2 className="text-lg font-semibold mb-4">{poll.question}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default LiveResults;
