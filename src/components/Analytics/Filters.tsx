  import React, { useState } from 'react';

  interface FiltersProps {
    onFilterChange: (filters: { fromDate: string; toDate: string; region: string }) => void;
  }

  const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [region, setRegion] = useState('all');

    const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFromDate = e.target.value;
      setFromDate(newFromDate);
      triggerFilterChange(newFromDate, toDate, region);
    };

    const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newToDate = e.target.value;
      setToDate(newToDate);
      triggerFilterChange(fromDate, newToDate, region);
    };

    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newRegion = e.target.value;
      setRegion(newRegion);
      triggerFilterChange(fromDate, toDate, newRegion);
    };

    const triggerFilterChange = (from: string, to: string, region: string) => {
      // Trigger the parent's `onFilterChange` function with updated filters
      onFilterChange({ fromDate: from, toDate: to, region });
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Filters</h3>
        <form>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* From Date Filter */}
            <div>
              <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={handleFromDateChange}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* To Date Filter */}
            <div>
              <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={handleToDateChange}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            {/* Region Filter */}
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                id="region"
                value={region}
                onChange={handleRegionChange}
                className="block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="all">All Regions</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    );
  };

  export default Filters;
