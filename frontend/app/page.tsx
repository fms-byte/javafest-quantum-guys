"use client";
import Link from "next/link";
import { useAuthProvider } from "@/lib/contexts/AuthContext";
import { ArrowUpRight } from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated } = useAuthProvider();
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                Stay Informed with Janun
              </h1>
              <p className="text-xl mb-8">
                Get real-time updates from government websites, universities,
                and public institutions in Bangladesh.
              </p>
              {isAuthenticated ? (
                <Link href="/feed" className="inline-block">
                  <div className="flex items-center bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition-colors">
                    <span>Go to Feed</span>
                    <ArrowUpRight className="ml-2" />
                  </div>
                </Link>
              ) : (
                <div className="space-x-4">
                  <Link
                    href="/feed"
                    className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/login"
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-700 transition-colors"
                  >
                    Log In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              How Janun Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Sources</h3>
                <p className="text-gray-600">
                  Browse and subscribe to various government and public
                  institution websites.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Notified</h3>
                <p className="text-gray-600">
                  Receive real-time updates and notifications about new
                  information.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Stay Informed</h3>
                <p className="text-gray-600">
                  Access all your important updates in one place, saving time
                  and effort.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
