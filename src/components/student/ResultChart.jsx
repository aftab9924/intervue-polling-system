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

const ResultChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-600 text-center">No results yet.</p>;
  }

  // Aggregate vote counts
  const voteCounts = data.reduce((acc, option) => {
    if (option) {
      acc[option] = (acc[option] || 0) + 1;
    }
    return acc;
  }, {});

  const labels = Object.keys(voteCounts);
  const values = Object.values(voteCounts);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Votes',
        data: values,
        backgroundColor: '#10b981', // emerald green
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
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
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">Live Poll Results</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ResultChart;
