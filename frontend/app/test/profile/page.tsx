"use client";
import { useEffect, useState } from "react";
import { ApiClient, Profile, User } from "@asfilab/janun-client";
import { Pacifico } from "next/font/google";
import { useRouter } from "next/navigation";
import { PencilIcon } from '@heroicons/react/24/solid'; // Importing a pencil icon from Heroicons

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter(); // Using Next.js router for navigation

  const fetchProfile = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.auth.getUser();
      setUser(result);
      if (result.profile) {
        setProfile(result.profile);
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      setResponse(error.message || "Error fetching profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!profile) return <p className="text-center mt-8">Profile not found</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className={`text-4xl font-bold text-red-500 mb-4 ${pacifico.className}`}>
        Profile
      </h1>
      <a href="/test" className="text-red-500 font-bold mb-4">
        ← Back to Home
      </a>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Profile Header */}
        <div className="relative mb-6">
          <img
            src={profile.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-red-500 mx-auto"
          />
          <h2 className="text-2xl font-bold text-gray-800 text-center mt-2">
            {profile.name}
          </h2>
          <p className="text-center text-gray-500">@{user?.username}</p>
          {(
            <a
              href="/profile/update"
              className="absolute top-0 right-0 mt-2 mr-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            >
              <PencilIcon className="w-6 h-6 text-gray-700" />
            </a>
          )}
        </div>
        {/* Profile Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Bio:</h3>
            <p className="text-gray-600">{profile.bio}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">City:</h3>
            <p className="text-gray-600">{profile.city}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Country:
            </h3>
            <p className="text-gray-600">{profile.country}</p>
          </div>
        </div>
      </div>
      <div id="responseContainer" className="mt-8 w-full max-w-sm text-red-500">
        {response && (
          <pre className="bg-white p-4 rounded-lg shadow-md break-all whitespace-pre-wrap max-h-64 overflow-y-auto">
            {response}
          </pre>
        )}
      </div>
    </div>
  );
}
