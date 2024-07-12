"use client";
import { Suspense } from "react";
import { useSidebar } from "@/lib/contexts/SidebarContext";
import { HashLoader } from "react-spinners";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import RightSidebar from "@/components/RightSidebar";
import { useAuthProvider } from "@/lib/contexts/AuthContext";

export default function Dashboard() {
  const { sidebarOpen, closeSidebar } = useSidebar();
  const { loading } = useAuthProvider();

  return (
    <div className="flex flex-1 overflow-hidden min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center h-screen mx-auto">
          <HashLoader color="#6366F1" size={50} />
        </div>
      ) : (
        <>
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
              onClick={closeSidebar}
            />
          )}
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen mx-auto">
                <HashLoader color="#6366F1" size={50} />
              </div>
            }
          >
            <div className="max-w-7xl mx-auto flex flex-col justify-between lg:flex-row flex-1 overflow-hidden">
              <Sidebar />
              <Feed />
              <RightSidebar />
            </div>
          </Suspense>
        </>
      )}
    </div>
  );
}
