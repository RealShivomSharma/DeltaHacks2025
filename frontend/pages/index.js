import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-400 to-pink-200">
      <h1 className="text-4xl font-bold mb-8 text-white">Housing Tinder</h1>
      <div className="space-x-4">
        <Link
          className="bg-white px-4 py-2 rounded-md text-pink-500 font-semibold hover:bg-pink-50"
          href="/register"
        >
          Register
        </Link>
        <Link
          className="bg-white px-4 py-2 rounded-md text-pink-500 font-semibold hover:bg-pink-50"
          href="/login"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

