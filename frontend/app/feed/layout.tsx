"use client";
import { Suspense } from "react";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HashLoader } from "react-spinners";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-50 to-cyan-50">
        <Header />
        <main className="flex flex-1 overflow-hidden">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen mx-auto">
                <HashLoader color="#6366F1" size={50} />
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
