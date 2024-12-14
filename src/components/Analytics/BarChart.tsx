import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  data: { region: string; users: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.region),
    datasets: [
      {
        label: 'Users by Region',
        data: data.map(item => item.users),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Users by Region',
      },
      tooltip: {
        mode: 'nearest' as const,
        intersect: false,
      },
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          font: {
            size: 14,
          },
          boxWidth: 20,
          padding: 10,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Region',
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Users',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8 w-full max-w-6xl mx-auto">
      <h3 className="text-3xl text-center font-semibold mb-5 py-5 ">Users by Region</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
