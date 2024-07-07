"use client";
import { FC } from "react";
import { BsFire } from "react-icons/bs";
import { MdStarBorderPurple500 } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { MdEvent } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-64 mt-4 lg:mt-0 bg-white shadow-lg transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 lg:relative lg:bg-transparent lg:translate-x-0 lg:w-1/4 lg:shadow-none`}
    >
      <div className="flex flex-col h-full p-4">
        <button title="close" onClick={onClose} className="lg:hidden mb-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li className="lg:hidden flex items-center space-x-2 p-2 bg-white hover:bg-gray-200 rounded-lg shadow cursor-pointer">
              <BsFire className="text-orange-500" size={20} />
              <span>Trending Topics</span>
            </li>
            <li className="lg:hidden flex items-center space-x-2 p-2 bg-white hover:bg-gray-200 rounded-lg shadow cursor-pointer">
              <MdStarBorderPurple500 className="text-orange-500" size={22} />
              <span>Top Channels</span>
            </li>
            <li className="flex items-center space-x-2 p-2 bg-white hover:bg-gray-200 rounded-lg shadow cursor-pointer">
              <IoCheckmarkDoneSharp className="text-green-500" size={22} />
              <span>Subscribed Channels</span>
            </li>
            <li className="flex items-center space-x-2 p-2 bg-white hover:bg-gray-200 rounded-lg shadow cursor-pointer">
              <BiCategoryAlt className="text-indigo-600" size={22} />
              <span>Categories</span>
            </li>
            <li className="flex items-center space-x-2 p-2 bg-white hover:bg-gray-200 rounded-lg shadow cursor-pointer">
              <MdEvent className="text-red-500" size={22} />
              <span>Events</span>
            </li>
            <li className="flex items-center space-x-2 p-2 bg-white hover:bg-gray-200 rounded-lg shadow cursor-pointer">
              <IoMdAlert className="text-yellow-500" size={22} />
              <span>Notices</span>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
