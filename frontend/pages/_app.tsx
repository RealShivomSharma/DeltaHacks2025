import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-macGrey text-gray-800">
      <nav className="bg-macMaroon text-white px-6 py-4 flex gap-6">
        <a href="/" className="hover:underline font-semibold">Home</a>
        <a href="/users" className="hover:underline font-semibold">Users</a>
        <a href="/groups" className="hover:underline font-semibold">Groups</a>
        <a href="/houses" className="hover:underline font-semibold">Houses</a>
        <a href="/swipeDeck" className="hover:underline font-semibold">SwipeDeck</a>
      </nav>
      <div className="p-6">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp

