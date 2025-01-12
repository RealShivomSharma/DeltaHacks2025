import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Register({ apiClient }) {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [profileImageUrl, setProfileImageUrl] = useState('')

  const handleRegister = async () => {
    try {
      await apiClient.post('/auth/register', {
        username,
        password,
        age: parseInt(age) || null,
        gender,
        profile_image_url: profileImageUrl
      })
      alert('Registered successfully! Now you can login.')
      router.push('/login')
    } catch (error) {
      alert(`Error: ${error.response?.data?.detail || error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-md shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          className="border p-2 w-full mb-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3"
          type="number"
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3"
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={e => setGender(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="text"
          placeholder="Profile Image URL"
          value={profileImageUrl}
          onChange={e => setProfileImageUrl(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md w-full"
        >
          Register
        </button>
      </div>
    </div>
  )
}

