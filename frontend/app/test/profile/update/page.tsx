"use client";
import { useEffect, useState } from "react";
import { ApiClient, Profile, UpdateProfileRequest } from "@asfilab/janun-client";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export default function ProfilePage() {
  const [response, setResponse] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.profile.getMyProfile();
      setProfile(result);
    } catch (error: any) {
      console.error("Error logging in:", error);
      setResponse(error.message || "Error logging in");
    }
  };

  const handleSave = async () => {
    if (profile) {
      try {
        const apiUrl = "http://localhost:5000";
        const token = localStorage.getItem("token") || "";
        const apiClient = new ApiClient(apiUrl, token);
        console.log("profile", profile);
        const result = await apiClient.profile.updateProfile({profile})
        setProfile(result);
        setResponse("Profile updated successfully");
        setIsEditing(false);
        console.log(result);
      } catch (error: any) {
        console.error("Error updating profile:", error);
        setResponse(error.message || "Error updating profile");
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className={`text-4xl font-bold text-red-500 mb-8 ${pacifico.className}`}>
        Janun!
      </h1>
      <a href="/profile" className="text-red-500 font-bold mb-8">
        ← Back to Profile
      </a>
      {profile && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">
              Avatar:
            </label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={profile.avatar}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
              Bio:
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={profile.city}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={profile.country}
              onChange={handleChange}
              disabled={!isEditing}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          )}
        </div>
      )}
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
