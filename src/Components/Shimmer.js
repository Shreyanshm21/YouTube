import React from 'react';
import { useSelector } from 'react-redux';


const ShimmerVideoCard = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  return (
    <div className={`animate-pulse p-2 my-2 w-80 h-72 shadow-lg flex flex-col ${isMenuOpen ? 'w-96 h-80' : ''}`}>
      <div className="rounded-lg bg-gray-300 h-[80%] w-full"></div>

      <div className="h-1/2 flex flex-row mt-2">
        <div className="flex items-center justify-around w-14 h-14">
          <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        </div>

        <div className="flex flex-col p-2 h-auto w-[82%] space-y-2">
          <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
          <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerVideoCard;
