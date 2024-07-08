import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Janun",
  description: "By Team Quantum Guys",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </SidebarProvider>
      </body>
    </html>
  );
}
