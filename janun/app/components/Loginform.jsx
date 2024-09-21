"use client";
import { useState } from "react";
import { ApiClient } from "@asfilab/janun-client";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export default function Login() {
  const [response, setResponse] = useState("");
  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("12345678");
  const [jwtToken, setJwtToken] = useState("");

  const handleLogin = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const apiClient = new ApiClient(apiUrl);
      const result = await apiClient.auth.login({
        loginRequest: {
          username,
          password,
        },
      });
      setJwtToken(result.token ? result.token : "");
      setResponse(JSON.stringify(result, null, 2));
      localStorage.setItem("token", result.token || "");
    } catch (error) {
      console.error("Error logging in:", error);
      setResponse(error.message || "Error logging in");
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(jwtToken);
    alert("Token copied to clipboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1
        className={`text-4xl font-bold text-red-500 mb-8 ${pacifico.className}`}
      >
        Janun!
      </h1>
      <a href="/" className=" text-red-500 font-bold mb-8">
        ← Back to Home
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
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Login
          </button>
        </div>
      </div>
      <div id="responseContainer" className="mt-8 w-full max-w-sm text-red-500">
        {response && (
          <pre className="bg-white p-4 rounded-lg shadow-md break-all whitespace-pre-wrap max-h-64 overflow-y-auto">
            {response}
          </pre>
        )}
      </div>

      <div
        id="tokenContainer"
        className={`mt-4 w-full max-w-sm ${jwtToken ? "" : "hidden"}`}
      >
        {/* <p id="jwtToken" className="text-gray-700">{jwtToken}</p> */}
        <button
          onClick={handleCopyToken}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Copy Token
        </button>
      </div>
    </div>
  );
}
