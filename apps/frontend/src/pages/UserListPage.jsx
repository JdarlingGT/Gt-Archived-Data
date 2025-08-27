import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import apiService from '../services/api';
import { useAuditLog } from '../contexts/AuditLogContext';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addAuditLog } = useAuditLog();

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    {
      key: 'createdAt',
      label: 'Created',
      render: (value) => new Date(value).toLocaleDateString()
    },
  ];

  const relations = [
    { key: 'licenses', label: 'Licenses' },
    { key: 'orders', label: 'Orders' },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await apiService.getUsers();
      setUsers(data);
      addAuditLog('VIEW', 'Users', 'System');
    } catch (err) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    // TODO: Implement edit functionality
    console.log('Edit user:', user);
    addAuditLog('EDIT', 'User', user.name);
  };

  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await apiService.deleteUser(user.id);
        setUsers(users.filter(u => u.id !== user.id));
        addAuditLog('DELETE', 'User', user.name);
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Failed to delete user');
      }
    }
  };

  const handleAddUser = () => {
    // TODO: Implement add user functionality
    console.log('Add new user');
    addAuditLog('CREATE', 'User', 'New User');
  };

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add User
        </button>
      </div>
      <Table
        columns={columns}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        relations={relations}
      />
    </div>
  );
};

export default UserListPage;