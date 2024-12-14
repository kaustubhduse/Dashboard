import React, { useEffect, useState } from 'react';

interface OverviewCardProps {
  title: string;
  value: number;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(value / (duration / 16)); 

    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value); 
        clearInterval(interval);
      } else {
        setDisplayValue(start);
      }
    }, 16); 
    // Update every 16ms (~60fps)

    return () => clearInterval(interval); 
  }, [value]);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="lg:text-5xl text-3xl font-semibold text-black">{displayValue}</p>
    </div>
  );
};

export default OverviewCard;
