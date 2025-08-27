import React, { useState, useEffect, useCallback } from 'react';
import { usePage } from '../contexts/PageContext';

const LicenseListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { setPageData } = usePage();

  // Mock data - replace with actual API data
  const licenses = [
    {
      id: 'LIC-678',
      user: 'Bob Johnson',
      type: 'Premium',
      expiration: '2023-06-11',
      status: 'Active'
    },
    {
      id: 'LIC-679',
      user: 'Alice Smith',
      type: 'Basic',
      expiration: '2023-05-15',
      status: 'Expired'
    },
    {
      id: 'LIC-680',
      user: 'Charlie Brown',
      type: 'Premium',
      expiration: '2023-08-22',
      status: 'Active'
    },
    {
      id: 'LIC-681',
      user: 'Diana Prince',
      type: 'Enterprise',
      expiration: '2023-07-30',
      status: 'Pending'
    }
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      Active: 'bg-green-100 text-green-700',
      Expired: 'bg-red-100 text-red-700',
      Pending: 'bg-yellow-100 text-yellow-700'
    };

    return (
      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  const filteredLicenses = licenses.filter(license =>
    license.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    license.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Memoize the action button to prevent re-renders
  const actionButton = useCallback(() => (
    <button
      onClick={() => setIsModalOpen(true)}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
    >
      Add License
    </button>
  ), []);

  // Set page title and action button
  useEffect(() => {
    setPageData('Licenses', actionButton());
  }, [setPageData, actionButton]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <input
          type="text"
          placeholder="Search licenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
        />
        
        <div className="text-sm text-gray-600">
          Total Licenses: {licenses.length} • Active: {licenses.filter(l => l.status === 'Active').length} • Expired: {licenses.filter(l => l.status === 'Expired').length}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">License ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Expiration</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLicenses.map((license) => (
              <tr key={license.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">{license.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{license.user}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{license.type}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{license.expiration}</td>
                <td className="px-6 py-4">
                  {getStatusBadge(license.status)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 space-x-2">
                  <button className="text-blue-600 hover:underline hover:text-blue-800 transition-colors">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline hover:text-red-800 transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {filteredLicenses.map((license) => (
          <div key={license.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{license.id}</h3>
              {getStatusBadge(license.status)}
            </div>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">User:</span> {license.user}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Type:</span> {license.type}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              <span className="font-medium">Expires:</span> {license.expiration}
            </p>
            <div className="flex space-x-3">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add License Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Add New License</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  License ID
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter license ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Select user"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                  <option>Basic</option>
                  <option>Premium</option>
                  <option>Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add License
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicenseListPage;