"use client";
import { Suspense, lazy } from "react";
import { useSidebar } from "@/lib/contexts/SidebarContext";
import { HashLoader } from "react-spinners";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import RightSidebar from "@/components/RightSidebar";

export default function Dashboard() {
  const { sidebarOpen, closeSidebar } = useSidebar();

  return (
    <div className="flex flex-1 overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen mx-auto">
          <HashLoader color="#6366F1" size={50} />
        </div>
      }>
        <div className="max-w-7xl mx-auto flex flex-col justify-between lg:flex-row flex-1 overflow-hidden">
          <Sidebar />
          <Feed />
          <RightSidebar />
        </div>
      </Suspense>
    </div>
  );
}