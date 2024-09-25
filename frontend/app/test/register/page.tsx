"use client";
import { useState, useEffect } from "react";
import { ApiClient, User } from "@asfilab/janun-client";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export default function Register() {
  const [response, setResponse] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const apiUrl = "http://localhost:5000";
        const apiClient = new ApiClient(apiUrl);
        const available = await apiClient.auth.checkUsername({ username });
        setUsernameAvailable(available.available || false);
      } catch (error) {
        console.error("Error checking username:", error);
      }
    };

    if (username) {
      checkUsername();
    }
  }, [username]);

  const handleRegister = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const apiClient = new ApiClient(apiUrl);
      if (!usernameAvailable) {
        setResponse("Username already taken");
        return;
      }
      const result: User = await apiClient.auth.register({
        registerRequest: {
          username,
          email,
          password,
        },
      });
      setResponse(JSON.stringify(result, null, 2));
    } catch (error: any) {
      console.error("Error registering:", error);
      setResponse(error.message || "Error registering");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1
        className={`text-4xl font-bold text-red-500 mb-8 ${pacifico.className}`}
      >
        Janun!
      </h1>
<<<<<<< HEAD:app/test/register/page.tsx
      <a href="/test" className="text-red-500 font-bold mb-8">
        ← Back to Home
=======
      <a href="/login" className="text-red-500 font-bold mb-8">
        Already a user?
>>>>>>> b2e842f92f9a9f4f6a7d2ea53ff32f0d2aa58c0e:app/register/page.tsx
      </a>
      <div className="w-full max-w-sm">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {username && !usernameAvailable && (
            <p className="text-red-500 text-xs italic mt-1 text-right">
              Username already taken
            </p>
          )}
          {username && usernameAvailable && (
            <p className="text-green-500 text-xs italic mt-1 text-right">
              Username available
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleRegister}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            disabled={!usernameAvailable || !username || !email || !password}
          >
            Register
          </button>
        </div>
      </div>
      {/* <div id="responseContainer" className="mt-8 w-full max-w-sm text-red-500">
        {response && (
          <pre className="bg-white p-4 rounded-lg shadow-md break-all whitespace-pre-wrap max-h-64 overflow-y-auto">
            {response}
          </pre>
        )}
      </div> */}
    </div>
  );
}
