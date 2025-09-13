import React, { useState } from 'react';
import { Home, MapPin } from 'lucide-react';
import Main from './Main';
import Map from './Map';

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState("home");

  return (
    <div className="">
      <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col">
        <div className="text-3xl font-bold mb-8 text-center border-b border-gray-700 pb-4">
          MyDashboard
        </div>
        <nav className="flex flex-col space-y-3">
          <div
            onClick={() => setSelectedTab("home")}
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </div>
          <div
            onClick={() => setSelectedTab("map")}
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
          >
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Map</span>
          </div>
        </nav>
        <div className="mt-auto text-xs text-gray-500 text-center">
          &copy; 2025 MyDashboard
        </div>
      </div>

      <div className="flex-1">
        {/* {selectedTab === "home" ? <Main /> : <Map />} */}
      </div>
    </div>
  );
}

export default Sidebar;
