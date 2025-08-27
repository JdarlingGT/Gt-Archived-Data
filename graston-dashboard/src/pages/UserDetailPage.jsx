import React from 'react';
import { useParams } from 'react-router-dom';

function UserDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>User Detail</h1>
      <p>This page will show detailed information for user ID: {id}.</p>
    </div>
  );
}

export default UserDetailPage;