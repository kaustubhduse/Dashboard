import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
  data: {
    labels: string[];
    data: number[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'User Registrations',
        data: data.data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'User Registration Trend',
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
          text: 'Months',
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
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8 w-full max-w-2xl mx-auto">
      <h3 className="text-3xl font-semibold mb-4 text-center py-3">User Registration Trend</h3>
      <div className="relative w-full" style={{ height: '400px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default LineChart;
