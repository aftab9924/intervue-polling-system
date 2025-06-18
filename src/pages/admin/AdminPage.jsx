import React, { useEffect, useState } from 'react';
import PastPollsTable from '../../components/admin/PastPollsTable';

const AdminPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/past-polls`)
      .then((res) => res.json())
      .then((data) => {
        setPolls(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load polls:', err);
        setError('Failed to load past polls.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Past Polls</h1>

      {loading && <p>Loading past polls...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && polls.length === 0 && (
        <p className="text-gray-600">No polls found.</p>
      )}

      {!loading && !error && polls.length > 0 && (
        <PastPollsTable polls={polls} />
      )}
    </div>
  );
};

export default AdminPage;
