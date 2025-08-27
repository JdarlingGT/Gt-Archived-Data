import React from 'react';

const LicenseListPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Licenses</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search licenses..."
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Add License
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">License ID</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Expiration</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Add license rows here */}
              <tr>
                <td className="px-4 py-2">LIC-6789</td>
                <td className="px-4 py-2">Bob Johnson</td>
                <td className="px-4 py-2">Premium</td>
                <td className="px-4 py-2">2026-01-31</td>
                <td className="px-4 py-2">Active</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 mr-2">Edit</button>
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LicenseListPage;