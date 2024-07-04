import Link from "next/link";
import { Search } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

const isLoggedIn = true; // this will be replaced with actual auth state management later on

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="mr-4 lg:hidden" title="Menu">
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
                  className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
              </div>
              <Link
                href="/profile"
                className="text-gray-600 hover:text-gray-900"
              >
                <div className="bg-indigo-500 rounded-full p-2 text-white">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </Link>
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
  );
}
