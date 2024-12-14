import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    activeUsers: number;
    inactiveUsers: number;
  };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        data: [data.activeUsers, data.inactiveUsers],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Red
          'rgba(255, 165, 0, 0.5)',  // Orange
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',   // Red
          'rgba(255, 165, 0, 1)',    // Orange
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: 'nearest' as const,
        intersect: false,
      },
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          font: {
            size: 16,
          },
          boxWidth: 20,
          padding: 15,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8 w-full max-w-2xl mx-auto">
      <h3 className="text-3xl font-semibold mb-4 text-center py-3">User Distribution</h3>
      <div className="relative w-full" style={{ height: '400px' }}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PieChart;
