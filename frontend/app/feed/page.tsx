"use client";
import { Suspense,lazy, useState } from "react";
import Header from "@/components/Header";
//import Feed from "@/components/Feed";
//import Sidebar from "@/components/Sidebar";
//import RightSidebar from "@/components/RightSidebar";
import Footer from "@/components/Footer";
import { HashLoader } from "react-spinners";

const Feed = lazy(() => import("@/components/Feed"));
const Sidebar = lazy(() => import("@/components/Sidebar"));
const RightSidebar = lazy(() => import("@/components/RightSidebar"));

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-50 to-cyan-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      <Header onMenuClick={toggleSidebar} />
      <main className="flex flex-1 overflow-hidden">
        <Suspense fallback={
          <div className="flex items-center justify-center h-screen mx-auto">
            <HashLoader color="#6366F1" size={50} />
          </div>
        }>
          <div className="flex flex-col justify-between lg:flex-row flex-1 overflow-hidden">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Feed />
            <RightSidebar />
          </div>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
