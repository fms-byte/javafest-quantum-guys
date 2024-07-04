"use client";
import Head from 'next/head'
import { useState } from 'react'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import TrendingTopics from '../components/TrendingTopics'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Janun - Stay Updated</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-6">Your Updates</h1>
            <Feed />
          </div>
          
          <div className="lg:w-1/4">
            <TrendingTopics />
          </div>
        </div>
      </main>
    </div>
  )
}