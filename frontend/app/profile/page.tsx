"use client";
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import SubscriptionList from '@/components/SubscriptionList'
import ActivityFeed from '@/components/ActivityFeed'

type UserProfile = {
  name: string
  email: string
  joinDate: string
  bio: string
  avatar: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const dummyProfile: UserProfile = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      joinDate: '2023-01-15',
      bio: "Passionate about staying informed on Bangladesh's public affairs.",
      avatar: '/avatar-placeholder.jpg',
    }
    setProfile(dummyProfile)
  }, [])

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Janun - User Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onMenuClick={() => {}} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-24 h-24 rounded-full mr-6"
            />
            <div>
              <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
              <p className="text-gray-600 mb-1">{profile.email}</p>
              <p className="text-gray-600 mb-2">Joined: {profile.joinDate}</p>
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">My Subscriptions</h2>
            <SubscriptionList />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  )
}