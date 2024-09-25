import Topbar from "@/app/components/Topbar";
import Navbar from "@/app/components/Navbar";
import Rightbar from "@/app/components/Rightbar";

export default function Layout({ children }) {
  return (
    <>
      <Topbar />
      <div className="flex flex-row justify-between">
        <Navbar />
        {children}
        <Rightbar />
      </div>
    </>
  );
}
