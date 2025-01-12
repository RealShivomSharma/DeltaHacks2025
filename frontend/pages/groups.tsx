import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Group {
  group_id: number;
  group_name: string | null;
  admin_user_id: number | null;
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupName, setGroupName] = useState('');
  const [adminUserId, setAdminUserId] = useState('');
  const [groupIdForAddRemove, setGroupIdForAddRemove] = useState('');
  const [userIdForAddRemove, setUserIdForAddRemove] = useState('');

  const apiBase = 'http://127.0.0.1:8000';

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    const res = await axios.get<Group[]>(`${apiBase}/groups`);
    setGroups(res.data);
  };

  const createGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        group_name: groupName || undefined,
        admin_user_id: adminUserId ? parseInt(adminUserId) : undefined
      };
      await axios.post(`${apiBase}/groups`, payload);
      setGroupName('');
      setAdminUserId('');
      fetchGroups();
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Error creating group');
    }
  };

  const addUserToGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupIdForAddRemove || !userIdForAddRemove) return;
    try {
      await axios.post(`${apiBase}/groups/${groupIdForAddRemove}/add_user/${userIdForAddRemove}`);
      setGroupIdForAddRemove('');
      setUserIdForAddRemove('');
      fetchGroups();
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Error adding user to group');
    }
  };

  const removeUserFromGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupIdForAddRemove || !userIdForAddRemove) return;
    try {
      await axios.post(`${apiBase}/groups/${groupIdForAddRemove}/remove_user/${userIdForAddRemove}`);
      setGroupIdForAddRemove('');
      setUserIdForAddRemove('');
      fetchGroups();
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Error removing user');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-macMaroon mb-4">Groups</h1>

      <form onSubmit={createGroup} className="space-y-2 mb-6">
        <div>
          <label className="mr-2">Group Name:</label>
          <input
            className="border px-2 py-1 rounded"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-2">Admin User ID:</label>
          <input
            className="border px-2 py-1 rounded"
            type="number"
            value={adminUserId}
            onChange={(e) => setAdminUserId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-macMaroon text-white px-4 py-1 rounded hover:bg-red-900"
        >
          Create Group
        </button>
      </form>

      {/* Add / Remove User */}
      <div className="border p-4 mb-6 bg-white rounded shadow">
        <h2 className="font-semibold mb-3">Manage Membership</h2>
        <form onSubmit={addUserToGroup} className="flex flex-col sm:flex-row gap-2 mb-2">
          <input
            className="border px-2 py-1 rounded"
            type="number"
            placeholder="Group ID"
            value={groupIdForAddRemove}
            onChange={(e) => setGroupIdForAddRemove(e.target.value)}
          />
          <input
            className="border px-2 py-1 rounded"
            type="number"
            placeholder="User ID"
            value={userIdForAddRemove}
            onChange={(e) => setUserIdForAddRemove(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            Add User
          </button>
        </form>
        <form onSubmit={removeUserFromGroup} className="flex gap-2">
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Remove User
          </button>
        </form>
      </div>

      {/* List Groups */}
      <h2 className="font-semibold text-lg mb-3">Existing Groups</h2>
      <ul className="space-y-2">
        {groups.map(g => (
          <li key={g.group_id} className="bg-white p-3 rounded shadow">
            <strong>ID {g.group_id}</strong>: {g.group_name || 'No Name'} (admin: {g.admin_user_id ?? 'none'})
          </li>
        ))}
      </ul>
    </div>
  );
}

