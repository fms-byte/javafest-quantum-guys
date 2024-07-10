"use client";
import { Suspense } from "react";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HashLoader } from "react-spinners";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Header />
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen mx-auto">
              <HashLoader color="#6366F1" size={50} />
            </div>
          }
        >
          {children}
        </Suspense>
        <Footer />
      </SidebarProvider>
    </AuthProvider>
  );
}
