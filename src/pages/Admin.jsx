import React, { useState } from 'react';

const AdminList = () => {
  
  const [newAdminAccount, setNewAdminAccount] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleAddUser = async () => {
    if (!newAdminAccount || !newPassword) {
      alert('Please fill in all fields!');
      return;
    }

    const newUser = {
      adminAccount: newAdminAccount,
      password: newPassword,
    };

    try {
      const response = await fetch('http://localhost:8080/Admin/registerAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to register admin');
      }

      const savedUser = await response.json();
      setUsers([...users, savedUser]);
      setNewAdminAccount('');
      setNewPassword('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdateUser = (id, updatedAdminAccount) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, adminAccount: updatedAdminAccount || user.adminAccount }
          : user
      )
    );
  };

  const handleDeleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div>

      <h2>Register New Admin</h2>
      <input
        type="text"
        value={newAdminAccount}
        onChange={(e) => setNewAdminAccount(e.target.value)}
        placeholder="Enter admin account"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button onClick={handleAddUser}>Register Admin</button>
    </div>
  );
};

export default AdminList;
