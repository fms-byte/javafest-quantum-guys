"use client";

import {ApiClient ,User } from '@asfilab/janun-client';
import { Pacifico } from 'next/font/google';
import { useEffect, useState } from 'react';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {

  const [response, setResponse] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = 'http://localhost:5000';
        const token = localStorage.getItem('token') || '';
        const apiClient = new ApiClient(apiUrl, token);
        const response = await apiClient.hello.testUser();
        setResponse(response);
      } catch (error) {
        console.error('Error fetching data:', error);
        setResponse("error!"); // or any other error handling logic
      }
    }
  
    fetchData();
  }, []);
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* <iframe src="/api/spline?url=https://my.spline.design/meeet-7ea22dcb2c3cd7ee7673d3a300778a42/" className="w-full h-full" title="Janun"></iframe> */}
      <h1 className={`text-4xl font-bold text-red-500 mb-8 ${pacifico.className}`}>Janun!</h1>

      <div className="w-full max-w-sm m-5 text-red-500">
        <pre className="bg-white p-4 rounded-lg shadow-md">
          {response}
        </pre>
      </div>

      <div className="w-full max-w-2xl">
        <ul className="flex flex-wrap justify-center gap-4">
          <li>
            <a href="/test/login" className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 text-red-500 font-bold">
              Login
            </a>
          </li>
          <li>
            <a href="/test/register" className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 text-red-500 font-bold">
              Register
            </a>
          </li>
          <li>
            <a href="/test/profile" className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 text-red-500 font-bold">
              Profile
            </a>
          </li>
          <li>
            <a href="/test/post" className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 text-red-500 font-bold">
              Post
            </a>
          </li>
          <li>
            <a href="/test/channel" className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 text-red-500 font-bold">
              Channel
            </a>
          </li>
          <li>
            <a href="/test/thread" className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 text-red-500 font-bold">
              Thread
            </a>
          </li>
          <li>
            <a href="/test/report" className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 text-red-500 font-bold">
              Report
            </a>
          </li>
          <li>
            <a href="/test/tag" className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 text-red-500 font-bold">
              Tag
            </a>
          </li>
          <li>
            <a href="/test/my" className="block p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 text-red-500 font-bold">
              My
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
