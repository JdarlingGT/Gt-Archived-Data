import React, { useState, useMemo } from 'react';
import { exportToCSV } from '../utils/csv-export';

const Table = ({ columns, data, onEdit, onDelete, relations }) => {
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRows, setExpandedRows] = useState({});

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(filter.toLowerCase())
      );
    });
  }, [data, filter]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExport = () => {
    exportToCSV(sortedData, 'exported-data');
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Export to CSV
        </button>
      </div>
      <table className="min-w-full bg-white dark:bg-gray-800 text-left">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-2 cursor-pointer"
                onClick={() => requestSort(column.key)}
              >
                <div className="flex items-center">
                  {column.label}
                  {sortConfig.key === column.key && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <React.Fragment key={item.id}>
              <tr>
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-2">
                    {column.render ? column.render(item[column.key]) : item[column.key]}
                  </td>
                ))}
                <td className="px-4 py-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                  {relations && relations.length > 0 && (
                    <button
                      onClick={() => toggleRowExpansion(item.id)}
                      className="text-gray-500 ml-2"
                    >
                      {expandedRows[item.id] ? 'Hide' : 'Show'} Details
                    </button>
                  )}
                </td>
              </tr>
              {expandedRows[item.id] && relations && relations.length > 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-2">
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                      {relations.map((relation) => (
                        <div key={relation.key} className="mb-2">
                          <h3 className="font-semibold">{relation.label}</h3>
                          <ul>
                            {item[relation.key].map((relatedItem) => (
                              <li key={relatedItem.id}>
                                {relatedItem.name} - {relatedItem.status}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;