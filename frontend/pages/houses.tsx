import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

export default function HousesPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [address, setAddress] = useState('');
  const [numRooms, setNumRooms] = useState('');
  const [numBathrooms, setNumBathrooms] = useState('');
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(false);
  const [price, setPrice] = useState('');
  const [internetIncluded, setInternetIncluded] = useState(false);
  const [parkingAvailable, setParkingAvailable] = useState(false);
  const [laundry, setLaundry] = useState(false);
  const [licensed, setLicensed] = useState(false);
  const [available, setAvailable] = useState(true);
  const [leaseStart, setLeaseStart] = useState('');
  const [leaseEnd, setLeaseEnd] = useState('');

  const apiBase = 'http://127.0.0.1:8000';

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    const res = await axios.get<House[]>(`${apiBase}/houses/`);
    setHouses(res.data);
  };

  const createHouse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!numRooms || !price) {
      alert('num_rooms and price are required');
      return;
    }
    try {
      const payload = {
        address: address || undefined,
        num_rooms: parseInt(numRooms, 10),
        num_bathrooms: numBathrooms ? parseInt(numBathrooms, 10) : undefined,
        utilities_included: utilitiesIncluded,
        price: parseFloat(price),
        internet_included: internetIncluded,
        parking_available: parkingAvailable,
        laundry,
        licensed,
        available,
        lease_start: leaseStart ? new Date(leaseStart) : undefined,
        lease_end: leaseEnd ? new Date(leaseEnd) : undefined
      };
      await axios.post(`${apiBase}/houses`, payload);
      // Reset form
      setAddress(''); setNumRooms(''); setNumBathrooms('');
      setUtilitiesIncluded(false); setPrice('');
      setInternetIncluded(false); setParkingAvailable(false);
      setLaundry(false); setLicensed(false);
      setAvailable(true);
      setLeaseStart(''); setLeaseEnd('');
      fetchHouses();
    } catch (err) {
      alert('Error creating house');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-macMaroon mb-4">Houses</h1>
      <form onSubmit={createHouse} className="space-y-2 mb-6">
        <div>
          <label className="mr-2">Address:</label>
          <input
            type="text"
            className="border px-2 py-1 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-2">Num Rooms:</label>
          <input
            type="number"
            className="border px-2 py-1 rounded"
            value={numRooms}
            onChange={(e) => setNumRooms(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-2">Num Bathrooms:</label>
          <input
            type="number"
            className="border px-2 py-1 rounded"
            value={numBathrooms}
            onChange={(e) => setNumBathrooms(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-2">Utilities Included:</label>
          <input
            type="checkbox"
            checked={utilitiesIncluded}
            onChange={(e) => setUtilitiesIncluded(e.target.checked)}
          />
        </div>
        <div>
          <label className="mr-2">Price:</label>
          <input
            type="number"
            step="0.01"
            className="border px-2 py-1 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-2">Internet Included:</label>
          <input
            type="checkbox"
            checked={internetIncluded}
            onChange={(e) => setInternetIncluded(e.target.checked)}
          />
        </div>
        <div>
          <label className="mr-2">Parking Available:</label>
          <input
            type="checkbox"
            checked={parkingAvailable}
            onChange={(e) => setParkingAvailable(e.target.checked)}
          />
        </div>
        <div>
          <label className="mr-2">Laundry:</label>
          <input
            type="checkbox"
            checked={laundry}
            onChange={(e) => setLaundry(e.target.checked)}
          />
        </div>
        <div>
          <label className="mr-2">Licensed:</label>
          <input
            type="checkbox"
            checked={licensed}
            onChange={(e) => setLicensed(e.target.checked)}
          />
        </div>
        <div>
          <label className="mr-2">Available:</label>
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </div>
        <div>
          <label className="mr-2">Lease Start:</label>
          <input
            type="date"
            className="border px-2 py-1 rounded"
            value={leaseStart}
            onChange={(e) => setLeaseStart(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-2">Lease End:</label>
          <input
            type="date"
            className="border px-2 py-1 rounded"
            value={leaseEnd}
            onChange={(e) => setLeaseEnd(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-macMaroon text-white px-4 py-1 rounded hover:bg-red-900">
          Create House
        </button>
      </form>

      <ul className="space-y-2">
        {houses.map(h => (
          <li key={h.house_id} className="bg-white p-3 rounded shadow">
            <div className="font-semibold">House #{h.house_id}</div>
            <div>{h.address ?? 'N/A'}</div>
            <div>{h.num_rooms} rooms, {h.num_bathrooms ?? 0} baths</div>
            <div>Utilities: {h.utilities_included ? 'Yes' : 'No'}, Price: ${h.price}</div>
            <div>Internet: {h.internet_included ? 'Yes' : 'No'}, Parking: {h.parking_available ? 'Yes' : 'No'}</div>
            <div>Laundry: {h.laundry ? 'Yes' : 'No'}, Licensed: {h.licensed ? 'Yes' : 'No'}</div>
            <div>Available: {h.available ? 'Yes' : 'No'}</div>
            <div>Lease Start: {h.lease_start ?? 'N/A'}, Lease End: {h.lease_end ?? 'N/A'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

