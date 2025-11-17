import React from 'react'
import Home from './pages/Home'


export default function App() {
  return (
    <div className="min-h-screen p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">Companies Directory</h1>
        <p className="text-sm text-gray-600">Filter, sort and browse companies — sample frontend assignment</p>
      </header>


      <main className="max-w-6xl mx-auto">
        <Home />
      </main>
    </div>
  )
}