import { useEffect, useState } from 'react'

export default function Matches({ apiClient, token }) {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    if (!token) return
    const fetchMatches = async () => {
      try {
        const res = await apiClient.get('/match/user-matches')
        setMatches(res.data.matches)
      } catch (error) {
        console.error('Error fetching matches:', error)
      }
    }
    fetchMatches()
  }, [token])

  if (!token) {
    return <div className="p-4">Please log in first.</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-4">Your Matches</h2>
      {matches.length === 0 && <p>No matches yet.</p>}
      <div className="space-y-3">
        {matches.map((m, idx) => (
          <div key={idx} className="bg-white p-4 rounded-md shadow">
            {m.match_type === 'user' && (
              <p className="text-pink-500 font-semibold">
                Matched with user ID: {m.user_id}
              </p>
            )}
            {m.match_type === 'house' && (
              <p className="text-green-500 font-semibold">
                Matched with house ID: {m.house_id}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

