import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axiosInstance from '../axiosInstance';


const Main = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [fetchRequests, setFetchRequests] = useState([]);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axiosInstance.get('/admin/requests');
        setFetchRequests(response);
        console.log(response);
        setPending(response.data.count);
      } catch (e) {
        console.log(e);
      }
    };
   fetchRequest();
  }, []);


  const handleApprove = async () => {
    if (!selectedRequest) return;
    try {
      await axiosInstance.post(`/admin/orgs/${selectedRequest.id}/approve`);
      alert('Organization approved');
      setSelectedRequest(null);
    } catch (error) {
      console.error('Approve error:', error);
    }
  };

  const handleDeny = async () => {
    if (!selectedRequest) return;
    try {
      await axiosInstance.post(`/admin/orgs/${selectedRequest.id}/deny`);
      alert('Organization denied and removed');
      setSelectedRequest(null);
    } catch (error) {
      console.error('Deny error:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white p-6 rounded-lg shadow h-[300px] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Requests List</h2>
            <div className="flex-1 overflow-y-auto">
              <ul>
                {fetchRequests.map((request) => (
                  <li
                    key={request.id}
                    onClick={() => setSelectedRequest(request)}
                    className={`p-3 mb-2 rounded cursor-pointer hover:bg-gray-200 ${
                      selectedRequest?.id === request.id ? 'bg-gray-300' : ''
                    }`}
                  >
                    <div className="font-medium">{request.name}</div>
                    <div className="text-sm text-gray-600 capitalize">{request.status}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {selectedRequest && (
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow h-[300px]">
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="space-y-4">
                <button
                  onClick={handleApprove}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={handleDeny}
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
