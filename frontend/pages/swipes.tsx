import React, { useState } from 'react';
import axios from 'axios';

export default function SwipesPage() {
  const apiBase = 'http://127.0.0.1:8000';

  // For user swipe
  const [userId, setUserId] = useState('');
  const [houseIdUserSwipe, setHouseIdUserSwipe] = useState('');

  // For group swipe
  const [groupId, setGroupId] = useState('');
  const [houseIdGroupSwipe, setHouseIdGroupSwipe] = useState('');

  const userSwipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !houseIdUserSwipe) return;
    try {
      const payload = { user_id: parseInt(userId), house_id: parseInt(houseIdUserSwipe) };
      const res = await axios.post(`${apiBase}/swipes/user`, payload);
      alert(res.data.message);
      setUserId('');
      setHouseIdUserSwipe('');
    } catch (err: any) {
      alert(err.response?.data?.detail || 'User swipe error');
    }
  };

  const groupSwipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupId || !houseIdGroupSwipe) return;
    try {
      const payload = { group_id: parseInt(groupId), house_id: parseInt(houseIdGroupSwipe) };
      const res = await axios.post(`${apiBase}/swipes/group`, payload);
      alert(res.data.message);
      setGroupId('');
      setHouseIdGroupSwipe('');
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Group swipe error');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-macMaroon mb-4">Tinder-Style Swipes</h1>
      <p className="mb-6">
        Enter the IDs below to simulate a “like” from either an individual user or a group for a given house.
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* User Card */}
        <div className="bg-white shadow-lg rounded p-6 w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-4">User &rarr; House</h2>
          <form onSubmit={userSwipe} className="space-y-3">
            <div>
              <label className="mr-2">User ID:</label>
              <input
                type="number"
                className="border px-2 py-1 rounded"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div>
              <label className="mr-2">House ID:</label>
              <input
                type="number"
                className="border px-2 py-1 rounded"
                value={houseIdUserSwipe}
                onChange={(e) => setHouseIdUserSwipe(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-macMaroon text-white px-4 py-1 rounded hover:bg-red-900"
            >
              Swipe!
            </button>
          </form>
        </div>

        {/* Group Card */}
        <div className="bg-white shadow-lg rounded p-6 w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-4">Group &rarr; House</h2>
          <form onSubmit={groupSwipe} className="space-y-3">
            <div>
              <label className="mr-2">Group ID:</label>
              <input
                type="number"
                className="border px-2 py-1 rounded"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              />
            </div>
            <div>
              <label className="mr-2">House ID:</label>
              <input
                type="number"
                className="border px-2 py-1 rounded"
                value={houseIdGroupSwipe}
                onChange={(e) => setHouseIdGroupSwipe(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-macMaroon text-white px-4 py-1 rounded hover:bg-red-900"
            >
              Swipe!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

