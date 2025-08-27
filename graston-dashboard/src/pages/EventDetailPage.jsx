import React from 'react';
import { useParams } from 'react-router-dom';

function EventDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Event Detail</h1>
      <p>This page will show detailed information for event ID: {id}.</p>
    </div>
  );
}

export default EventDetailPage;