import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axiosInstance from '../axiosInstance';

const Main = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [fetchRequests, setFetchRequests] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axiosInstance.get('/admin/requests');
        setFetchRequests(response.data.pending);
        console.log(response.data.pending);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRequest();
  }, []);

  // Function to fetch user information
  const fetchUserInfo = async (userId) => {
    if (!userId) return;
    
    setLoadingUserInfo(true);
    try {
      const response = await axiosInstance.get(`/admin/user/${userId}`);
      setUserInfo(response.data.data);
      console.log('User info:', response.data.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
      setUserInfo(null);
    } finally {
      setLoadingUserInfo(false);
    }
  };

  // Handle request selection and fetch user info
  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
    if (request.user_id) {
      fetchUserInfo(request.user_id);
    } else {
      setUserInfo(null);
    }
  };


  const handleApprove = async () => {
    if (!selectedRequest) return;
    try {
      await axiosInstance.post(`/admin/requests/${selectedRequest._id}/approve`);
      alert('Organization approved');
      setSelectedRequest(null);
      // Refresh the requests list
      const response = await axiosInstance.get('/admin/requests');
      setFetchRequests(response.data.pending);
    } catch (error) {
      console.error('Approve error:', error);
    }
  };

  const handleDeny = async () => {
    if (!selectedRequest) return;
    try {
      await axiosInstance.post(`/admin/requests/${selectedRequest._id}/deny`);
      alert('Organization denied and removed');
      setSelectedRequest(null);
      // Refresh the requests list
      const response = await axiosInstance.get('/admin/requests');
      setFetchRequests(response.data.pending);
    } catch (error) {
      console.error('Deny error:', error);
    }
  };

  const total = fetchRequests.length;
  const accepted = fetchRequests.filter(r => r.status === 'accepted').length;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-sm uppercase mb-2">Total Requests</div>
            <div className="text-2xl font-bold">{total}</div>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-sm uppercase mb-2">Pending Requests</div>
            <div className="text-2xl font-bold">{pending}</div>
          </div>
          <div className="bg-green-600 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-sm uppercase mb-2">Accepted Requests</div>
            <div className="text-2xl font-bold">{accepted}</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white p-6 rounded-lg shadow h-[300px] flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Requests List</h2>
            <div className="flex-1 overflow-y-auto">
              <ul>
                {fetchRequests.map((request) => (
                  <li
                    key={request._id}
                    onClick={() => handleRequestSelect(request)}
                    className={`p-3 mb-2 rounded cursor-pointer hover:bg-gray-200 ${
                      selectedRequest?._id === request._id ? 'bg-gray-300' : ''
                    }`}
                  >
                    <div className="font-medium">Organization ID: {request._id}</div>
                    <div className="text-sm text-gray-600">
                      Status: {request.is_approved ? 'Approved' : 'Pending'}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {selectedRequest && (
            <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow h-[600px] flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Organization Details & Actions</h2>
              
              {/* Organization Info */}
              <div className="mb-4 p-4 bg-gray-50 rounded">
                <h3 className="font-semibold text-lg mb-2">Organization Information</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>ID:</strong> {selectedRequest._id}</p>
                  <p><strong>Status:</strong> {selectedRequest.is_approved ? 'Approved' : 'Pending'}</p>
                  <p><strong>Size:</strong> {selectedRequest.size || 'Not specified'}</p>
                  <p><strong>Address:</strong> Lat: {selectedRequest.address?.latitude}, Lng: {selectedRequest.address?.longitude}</p>
                  <p><strong>Certificate ID:</strong> {selectedRequest.cert_id || 'Not provided'}</p>
                </div>
              </div>

              {/* User Info */}
              <div className="mb-4 p-4 bg-blue-50 rounded flex-1 overflow-y-auto">
                <h3 className="font-semibold text-lg mb-2">User Information</h3>
                {loadingUserInfo ? (
                  <p className="text-gray-600">Loading user information...</p>
                ) : userInfo ? (
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-blue-700">Basic Info</h4>
                      <div className="text-sm space-y-1">
                        <p><strong>Name:</strong> {userInfo.user.name}</p>
                        <p><strong>Phone:</strong> {userInfo.user.phno}</p>
                        <p><strong>Role:</strong> {userInfo.user.role}</p>
                        <p><strong>User ID:</strong> {userInfo.user._id}</p>
                      </div>
                    </div>
                    
                    {userInfo.donor && (
                      <div>
                        <h4 className="font-medium text-green-700">Donor Profile</h4>
                        <div className="text-sm">
                          <p><strong>Donor ID:</strong> {userInfo.donor._id}</p>
                        </div>
                      </div>
                    )}
                    
                    {userInfo.organization && (
                      <div>
                        <h4 className="font-medium text-purple-700">Organization Profile</h4>
                        <div className="text-sm space-y-1">
                          <p><strong>Org ID:</strong> {userInfo.organization._id}</p>
                          <p><strong>Approved:</strong> {userInfo.organization.is_approved ? 'Yes' : 'No'}</p>
                          <p><strong>Size:</strong> {userInfo.organization.size}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">No user information available</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleApprove}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                  disabled={loadingUserInfo}
                >
                  Accept Organization
                </button>
                <button
                  onClick={handleDeny}
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
                  disabled={loadingUserInfo}
                >
                  Reject Organization
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
