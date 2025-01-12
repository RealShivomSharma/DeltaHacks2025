import '../styles/globals.css'
import { useState } from 'react'
import axios from 'axios'

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
  })

  apiClient.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error) => Promise.reject(error))

  return (
    <Component
      {...pageProps}
      apiClient={apiClient}
      token={token}
      setToken={setToken}
      userId={userId}
      setUserId={setUserId}
    />
  )
}

export default MyApp

