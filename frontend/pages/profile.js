import { useEffect, useState } from 'react'

export default function Profile({ apiClient, token }) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (!token) return
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get('/auth/me', {
          params: { token }
        })
        setProfile(res.data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
    fetchProfile()
  }, [token])

  if (!token) {
    return <div className="p-4">Please log in first.</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-4">Your Profile</h2>
      {profile ? (
        <div className="bg-white p-4 rounded shadow">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          {profile.profile_image_url && (
            <img
              src={profile.profile_image_url}
              alt="Profile"
              className="w-32 h-32 rounded-full mt-3"
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

