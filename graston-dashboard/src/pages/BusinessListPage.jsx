import React, { useState, useEffect } from 'react';

function BusinessListPage() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch business data from the backend
    fetch('http://localhost:5000/api/csv_data?file_name=businesses.csv')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBusinesses(data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Business List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Address</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map(business => (
            <tr key={business.id}>
              <td>{business.id}</td>
              <td>{business.name}</td>
              <td>{business.type}</td>
              <td>{business.address}</td>
              <td>{business.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusinessListPage;