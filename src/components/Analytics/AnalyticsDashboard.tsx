import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import OverviewCard from './OverviewCard';
import LineChart from './LineChart';
import PieChart from './PieChart';
import BarChart from './BarChart';
import Filters from './Filters';
import mockData from '../db.json';

const AnalyticsDashboard: React.FC = () => {
  const [filterState, setFilterState] = useState({
    fromDate: '',
    toDate: '',
    region: 'all',
  });
  const [filteredUsers, setFilteredUsers] = useState(mockData.users);

  const { deletedUsers } = useSelector(
    (state: RootState) => state.analytics
  );

  const applyFilters = () => {
    let filtered = [...mockData.users];

    if (filterState.region !== 'all') {
      filtered = filtered.filter(user => user.region === filterState.region);
    }

    if (filterState.fromDate && filterState.toDate) {
      const fromDate = new Date(filterState.fromDate);
      const toDate = new Date(filterState.toDate);

      filtered = filtered.filter(user => {
        const userDate = new Date(user.createdAt);
        return userDate >= fromDate && userDate <= toDate;
      });
    }

    setFilteredUsers(filtered);
  };

  const computeMetrics = () => {
    const totalUsers = filteredUsers.length;
    const activeUsers = filteredUsers.filter(user => user.status === 'active').length;
    const deletedUsers = filteredUsers.filter(user => user.status === 'deleted').length;

    return { totalUsers, activeUsers, deletedUsers };
  };

  useEffect(() => {
    applyFilters();
  }, [filterState]);

  const { totalUsers: computedTotal, activeUsers: computedActive } = computeMetrics();
  const pieChartData = {
    activeUsers: computedActive,
    inactiveUsers: Math.max(computedTotal - computedActive, 0),
  };

  const handleFilterChange = (newFilters: { fromDate: string; toDate: string; region: string }) => {
    setFilterState(newFilters);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center">Analytics Dashboard</h1>

      <Filters onFilterChange={handleFilterChange} />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <OverviewCard title="Total Users" value={computedTotal} />
        <OverviewCard title="Active Users" value={computedActive} />
        <OverviewCard title="Deleted Users" value={deletedUsers} />
      </div>

      <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="w-full">
          <LineChart data={mockData.userRegistrationTrend} />
        </div>
        <div className="w-full">
          <PieChart data={pieChartData} />
        </div>
      </div>

      <div className="mt-8">
        <BarChart data={mockData.usersByRegion} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
