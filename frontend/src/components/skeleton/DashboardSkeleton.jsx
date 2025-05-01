import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const DashboardSkeleton = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Skeleton width={120} height={24} />
        <Skeleton width={100} height={36} />
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Pie Chart Section */}
        <div className="bg-white p-4 rounded-xl w-full md:w-1/2 lg:w-1/3 h-[320px] flex justify-center items-center">
          <Skeleton circle={true} height={250} width={250} />
        </div>

        {/* Expenses List Section */}
        <div className="flex-1 space-y-4">
          <Skeleton width={100} height={20} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-lg shadow space-y-2"
              >
                <Skeleton width={`70%`} height={20} />
                <Skeleton width={`50%`} height={16} />
                <Skeleton width={`40%`} height={16} />
                <Skeleton width={`25%`} height={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
