import React from 'react'
import TinderCard from 'react-tinder-card'

export default function SwipeCard({ item, onSwipe, onCardLeftScreen }) {
  const handleSwipe = (direction) => {
    onSwipe(direction, item)
  }

  return (
    <TinderCard
      className="absolute"
      key={item.id}
      onSwipe={(dir) => handleSwipe(dir)}
      onCardLeftScreen={() => onCardLeftScreen(item.id)}
    >
      <div className="relative w-72 h-96 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
        {/* If it's a house */}
        {item.address ? (
          <>
            {item.image_url && (
              <img
                src={item.image_url}
                alt="House"
                className="rounded-md w-full h-40 object-cover mb-3"
              />
            )}
            <h3 className="text-xl font-semibold">{item.address}</h3>
            <p className="text-sm text-gray-600">{item.city}</p>
            <p className="text-sm text-gray-600">
              ${item.price} | {item.bedrooms} BR, {item.bathrooms} Bath
            </p>
          </>
        ) : (
          /* Otherwise it's a user */
          <>
            {item.profile_image_url && (
              <img
                src={item.profile_image_url}
                alt={item.username}
                className="rounded-full w-32 h-32 object-cover mb-3"
              />
            )}
            <h3 className="text-xl font-semibold">{item.username}</h3>
            <p className="text-sm text-gray-600">Age: {item.age}</p>
            <p className="text-sm text-gray-600">Gender: {item.gender}</p>
          </>
        )}
      </div>
    </TinderCard>
  )
}

