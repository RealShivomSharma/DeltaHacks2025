import { useState, useEffect } from 'react'
import SwipeCard from '../components/SwipeCard'

export default function SwipePage({ apiClient, token, userId }) {
  const [items, setItems] = useState([])
  const [isHouseView, setIsHouseView] = useState(true) // toggle houses or roommates

  useEffect(() => {
    if (!token) return

    const fetchData = async () => {
      try {
        if (isHouseView) {
          // we expect /houses route from your backend
          const res = await apiClient.get('/houses')
          setItems(res.data)
        } else {
          // fetch all users, except current user
          const res = await apiClient.get('/users')
          const others = res.data.filter(u => u.id !== userId)
          setItems(others)
        }
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }

    fetchData()
  }, [isHouseView, token])

  // Called when user swipes left or right
  const handleSwipe = async (direction, item) => {
    if (!token) return
    let targetType = isHouseView ? 'house' : 'user'
    try {
      await apiClient.post('/swipe/', {
        target_type: targetType,
        target_id: item.id,
        direction: direction === 'right' ? 'right' : 'left'
      })
    } catch (err) {
      console.error('Swipe error:', err)
    }
  }

  // Called by react-tinder-card when the card leaves the screen
  const handleCardLeftScreen = (id) => {
    // Optionally remove from local state
    setItems(prev => prev.filter(item => item.id !== id))
  }

  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl">Please log in first.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-pink-100 flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold mt-6 mb-4">
        {isHouseView ? 'Swipe Houses' : 'Swipe Roommates'}
      </h2>

      <button
        className="mb-6 bg-white px-4 py-2 rounded-md text-pink-500 font-semibold hover:bg-pink-50"
        onClick={() => setIsHouseView(!isHouseView)}
      >
        {isHouseView ? 'Swipe on Roommates' : 'Swipe on Houses'}
      </button>

      <div className="relative w-full h-[600px] flex justify-center items-center">
        {items.length === 0 ? (
          <div className="text-xl font-semibold">No more items!</div>
        ) : (
          items.map((item, index) => (
            <div key={item.id} className="absolute">
              <SwipeCard
                item={item}
                onSwipe={handleSwipe}
                onCardLeftScreen={handleCardLeftScreen}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

