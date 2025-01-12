import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login({ apiClient, setToken, setUserId }) {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const res = await apiClient.post('/auth/login', { username, password })
      setToken(res.data.access_token)
      setUserId(res.data.user_id)
      alert('Login successful.')
      router.push('/swipe')
    } catch (error) {
      alert(`Error: ${error.response?.data?.detail || error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-md shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md w-full"
        >
          Login
        </button>
      </div>
    </div>
  )
}

