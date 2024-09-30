// Shimmer.js
import React from 'react';

const ShimmerCard2 = () => {
  return (
    <div className="shimmer-card grid grid-cols-2 gap-2 h-[235.375px] w-[855px] p-4  ">
      <div className="w-[400px] h-full  bg-gray-300 animate-pulse rounded-lg"></div>
      <div className="flex flex-col p-4">
        <div className="bg-gray-300 animate-pulse h-6 w-3/4 mb-2"></div>
        <div className="bg-gray-300 animate-pulse h-4 w-1/2 mb-2"></div>
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-gray-300 animate-pulse h-5 w-5 rounded-full"></div>
          <div className="bg-gray-300 animate-pulse h-4 w-1/2"></div>
        </div>
        <div className="bg-gray-300 animate-pulse h-4 w-full"></div>
      </div>
    </div>
  );
};

export default ShimmerCard2;
