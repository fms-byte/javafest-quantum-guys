"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { FaUser } from "react-icons/fa";
import ProfileSheet from "./ProfileSheet";
import { useSidebar } from "@/lib/contexts/SidebarContext";
import { useAuthProvider } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);
  const toggleProfileSheet = () => setIsProfileSheetOpen(!isProfileSheetOpen);
  const { user, loading, logout } = useAuthProvider();

  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const isLoggedIn = Boolean(user && !loading);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl p-2 container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 lg:hidden"
              title="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link
              href={isLoggedIn ? "/feed" : "/"}
              className="text-2xl font-bold text-indigo-600"
            >
              Janun
            </Link>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center">
                <div className="relative hidden md:block mr-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400" />
                  </div>
                </div>
                <button
                  onClick={toggleProfileSheet}
                  className="bg-indigo-500 rounded-full p-2 text-white"
                  title="Profile"
                >
                  <FaUser />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-white px-6 py-2 rounded-full font-semibold bg-indigo-700 transition-colors"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </header>
      <ProfileSheet isOpen={isProfileSheetOpen} onClose={toggleProfileSheet} />
    </>
  );
}
