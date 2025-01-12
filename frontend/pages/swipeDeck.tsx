import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TinderCard from 'react-tinder-card';

interface House {
  house_id: number;
  address: string | null;
  num_rooms: number;
  num_bathrooms: number | null;
  utilities_included: boolean;
  price: number;
  internet_included: boolean;
  parking_available: boolean;
  laundry: boolean;
  licensed: boolean;
  available: boolean;
  lease_start: string | null;
  lease_end: string | null;
}

export default function SwipeDeckPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [mode, setMode] = useState<'USER' | 'GROUP'>('USER');
  const [idValue, setIdValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const apiBase = 'http://127.0.0.1:8000';

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const res = await axios.get<House[]>(`${apiBase}/houses`);
      const reversed = res.data.slice().reverse();
      setHouses(reversed);
      setCurrentIndex(reversed.length - 1);
    } catch (err) {
      alert('Error fetching houses');
    }
  };

  const handleSwipe = async (direction: string, house: House, index: number) => {
    if (direction === 'right') {
      await handleLike(house.house_id);
    }
    setCurrentIndex(index - 1);
  };

  const handleLike = async (houseId: number) => {
    if (!idValue) {
      alert('Please provide a user/group ID');
      return;
    }
    try {
      if (mode === 'USER') {
        await axios.post(`${apiBase}/swipes/user`, {
          user_id: parseInt(idValue, 10),
          house_id: houseId,
        });
      } else {
        await axios.post(`${apiBase}/swipes/group`, {
          group_id: parseInt(idValue, 10),
          house_id: houseId,
        });
      }
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Error on like');
    }
  };

  const outOfFrame = (houseId: number) => {
    console.log(`House ${houseId} left the screen`);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-macMaroon mb-4">Swiping Deck</h1>
      <p className="mb-4 text-center max-w-xl">
        Swipe right to like, left to skip. Choose your ID and whether you’re a user or group.
      </p>

      <div className="mb-6 flex flex-col items-center gap-2">
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="mode"
              value="USER"
              checked={mode === 'USER'}
              onChange={() => setMode('USER')}
            />
            User Mode
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="mode"
              value="GROUP"
              checked={mode === 'GROUP'}
              onChange={() => setMode('GROUP')}
            />
            Group Mode
          </label>
        </div>
        <input
          type="number"
          placeholder={mode === 'USER' ? 'User ID' : 'Group ID'}
          className="border px-3 py-1 rounded"
          value={idValue}
          onChange={(e) => setIdValue(e.target.value)}
        />
      </div>

      <div className="relative w-[300px] h-[450px]">
        {houses.map((house, index) => {
          const isActive = index === currentIndex;
          return (
            <TinderCard
              className="absolute"
              key={house.house_id}
              onSwipe={(dir) => handleSwipe(dir, house, index)}
              onCardLeftScreen={() => outOfFrame(house.house_id)}
              preventSwipe={['up','down']}
            >
              <div
                className={`w-[300px] h-[450px] bg-white rounded-xl shadow-xl flex flex-col items-center p-4 
                  ${isActive ? 'z-10' : 'z-0'}`}
              >
                <h2 className="text-xl font-semibold text-macMaroon mb-2">
                  House #{house.house_id}
                </h2>
                <p className="text-gray-700 text-center mb-2">
                  {house.address || 'No Address'}
                </p>
                <div className="text-sm text-gray-600 mb-1">
                  {house.num_rooms} rooms, {house.num_bathrooms ?? 0} baths
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Price: ${house.price}, Utilities: {house.utilities_included ? 'Yes' : 'No'}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Internet: {house.internet_included ? 'Yes' : 'No'}, Parking: {house.parking_available ? 'Yes' : 'No'}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Laundry: {house.laundry ? 'Yes' : 'No'}, Licensed: {house.licensed ? 'Yes' : 'No'}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Available: {house.available ? 'Yes' : 'No'}
                </div>
                <div className="text-sm text-gray-600">
                  Lease: {house.lease_start ?? 'N/A'} → {house.lease_end ?? 'N/A'}
                </div>
              </div>
            </TinderCard>
          );
        })}
      </div>
    </div>
  );
}

