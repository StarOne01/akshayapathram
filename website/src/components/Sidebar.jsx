import React, { useState } from 'react';
import { Home, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Main from './Main';
import Map from './Map';

const Sidebar = () => {
  return (
    <div
    >
    <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col">
      <Link to="/home" className="text-3xl font-bold mb-8 text-center border-b border-gray-700 pb-4">
        MyDashboard
      </Link>
      <nav className="flex flex-col space-y-3">
        <div
          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Home</span>
        </div>
        <Link to="/map"
          className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          <MapPin className="w-5 h-5" />
          <span className="font-medium">Map</span>
        </Link>
      </nav>
      <div className="mt-auto text-xs text-gray-500 text-center">
        &copy; 2025 MyDashboard
      </div>
    </div>
    </div>
  );
}

export default Sidebar;