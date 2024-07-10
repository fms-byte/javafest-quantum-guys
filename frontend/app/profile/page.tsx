"use client";
import { useState, useEffect } from "react";
import SubscriptionList from "@/components/SubscriptionList";
import ActivityFeed from "@/components/ActivityFeed";
import { useAuthProvider } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading, logout } = useAuthProvider();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <div>
              {/* <h1 className="text-2xl font-semibold">{user.username}</h1>
              <p className="text-sm text-gray-500">{user.email}</p> */}
              <button onClick={logout} className="text-sm text-red-500">
                Logout
              </button>
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
  );
}
