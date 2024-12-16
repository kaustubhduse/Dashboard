import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  const { deletedUsers } = useSelector((state: RootState) => state.analytics);

  const applyFilters = () => {
    let filtered = [...mockData.users];

    if (filterState.region !== 'all') {
      filtered = filtered.filter((user) => user.region === filterState.region);
    }

    if (filterState.fromDate && filterState.toDate) {
      const fromDate = new Date(filterState.fromDate);
      const toDate = new Date(filterState.toDate);

      filtered = filtered.filter((user) => {
        const userDate = new Date(user.createdAt);
        return userDate >= fromDate && userDate <= toDate;
      });
    }

    setFilteredUsers(filtered);
  };

  const computeMetrics = () => {
    const totalUsers = filteredUsers.length;
    const activeUsers = filteredUsers.filter((user) => user.status === 'active').length;
    const deletedUsers = filteredUsers.filter((user) => user.status === 'deleted').length;

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
    <motion.div
      className="p-8 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-10 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Analytics Dashboard
      </motion.h1>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Filters onFilterChange={handleFilterChange} />
      </motion.div>

      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.div>
          <OverviewCard title="Total Users" value={computedTotal} />
        </motion.div>
        <motion.div>
          <OverviewCard title="Active Users" value={computedActive} />
        </motion.div>
        <motion.div>
          <OverviewCard title="Deleted Users" value={deletedUsers} />
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ staggerChildren: 0.3 }}
      >
        <motion.div>
          <LineChart data={mockData.userRegistrationTrend} />
        </motion.div>
        <motion.div>
          <PieChart data={pieChartData} />
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <BarChart data={mockData.usersByRegion} />
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsDashboard;
