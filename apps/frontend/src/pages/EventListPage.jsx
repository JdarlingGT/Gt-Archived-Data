import React from 'react';

const EventListPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search events..."
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Add Event
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Add event rows here */}
              <tr>
                <td className="px-4 py-2">Annual Conference</td>
                <td className="px-4 py-2">2025-12-15</td>
                <td className="px-4 py-2">New York, NY</td>
                <td className="px-4 py-2">Upcoming</td>
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

export default EventListPage;