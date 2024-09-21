import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Linktab({ children, logo, goto }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(goto)}
      className="flex items-center p-2 hover:bg-gray-200 hover:cursor-pointer rounded-lg"
    >
      <img src={logo} className="h-5 w-5 mr-4" />
      {children}
    </div>
  );
}
