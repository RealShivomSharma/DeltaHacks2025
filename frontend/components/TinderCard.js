export default function TinderCard({ item }) {
  if (!item) return null

  const cardStyle = {
    width: '300px',
    height: '400px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    position: 'relative',
    backgroundColor: '#fff',
    padding: '20px',
    textAlign: 'center'
  }

  // If it's a house
  if (item.address) {
    return (
      <div style={cardStyle}>
        <h3>{item.address}</h3>
        <p>City: {item.city}</p>
        <p>Price: ${item.price}</p>
        <p>Bedrooms: {item.bedrooms}</p>
        <p>Bathrooms: {item.bathrooms}</p>
        {item.image_url && (
          <img src={item.image_url} alt="House" style={{ width: '100%', marginTop: '10px' }} />
        )}
      </div>
    )
  }

  // Else it's a user
  return (
    <div style={cardStyle}>
      <h3>{item.username}</h3>
      {item.profile_image_url && (
        <img src={item.profile_image_url} alt={item.username} style={{ width: '100%', marginBottom: '10px' }} />
      )}
      <p>Age: {item.age}</p>
      <p>Gender: {item.gender}</p>
    </div>
  )
}

