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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 overflow-hidden">
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
            <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden">
              <div className="w-full lg:w-1/5 lg:h-screen lg:overflow-y-auto stylish-scrollbar">
                <Sidebar />
              </div>
              <div className="w-full lg:w-3/5 h-screen overflow-y-auto stylish-scrollbar px-4 py-2 lg:px-4">
                <div className="mx-auto rounded-lg shadow-sm ">
                  <Feed />
                </div>
              </div>
              <div className="w-full lg:w-1/5 lg:h-screen lg:overflow-y-auto stylish-scrollbar">
                <RightSidebar />
              </div>
            </div>
          </Suspense>
        </>
      )}
    </div>
  );
}