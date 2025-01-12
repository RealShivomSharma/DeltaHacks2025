import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  user_id: number;
  name: string;
  age: number | null;
  gender: string | null;
  program: string | null;
  school: string | null;
  bio: string | null;
  primary_group_id: number | null;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [program, setProgram] = useState('');
  const [school, setSchool] = useState('');
  const [bio, setBio] = useState('');

  const apiBase = 'http://127.0.0.1:8000';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get<User[]>(`${apiBase}/users`);
    setUsers(res.data);
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert('Name is required');
      return;
    }
    try {
      const payload = {
        name,
        age: age ? parseInt(age, 10) : undefined,
        gender: gender || undefined,
        program: program || undefined,
        school: school || undefined,
        bio: bio || undefined
      };
      await axios.post(`${apiBase}/users`, payload);
      setName(''); setAge(''); setGender(''); setProgram(''); setSchool(''); setBio('');
      fetchUsers();
    } catch (err) {
      alert('Error creating user');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-macMaroon mb-4">Users</h1>
      <form onSubmit={createUser} className="space-y-2 mb-6">
        <div>
          <label className="mr-2">Name:</label>
          <input
            type="text"
            className="border px-2 py-1 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-2">Age:</label>
          <input
            type="number"
            className="border px-2 py-1 rounded"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-2">Gender:</label>
          <input
            type="text"
            className="border px-2 py-1 rounded"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-2">Program:</label>
          <input
            type="text"
            className="border px-2 py-1 rounded"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-2">School:</label>
          <input
            type="text"
            className="border px-2 py-1 rounded"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-2">Bio:</label>
          <textarea
            className="border px-2 py-1 rounded"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-macMaroon text-white px-4 py-1 rounded hover:bg-red-900"
        >
          Create User
        </button>
      </form>

      <ul className="space-y-2">
        {users.map(u => (
          <li key={u.user_id} className="bg-white p-3 rounded shadow">
            <strong>ID {u.user_id}</strong> - {u.name}
            {u.age !== null && `, Age ${u.age}`}
            {u.gender && `, Gender ${u.gender}`}
            {u.program && `, Program: ${u.program}`}
            {u.school && `, School: ${u.school}`}
            {u.bio && <div className="text-sm text-gray-600 mt-1">Bio: {u.bio}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

