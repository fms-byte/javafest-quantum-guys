import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

export default function Topbar() {
  return (
    <div className="z-10 p-3 flex flex-row justify-between drop-shadow-md bg-white sticky w-full top-0 ">
      <div className="navbarButton-icon gap-4 flex flex-row">
        <svg
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          className="w-8 h-10"
        >
          <path
            d="m21 15.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
            fillRule="nonzero"
          />
        </svg>
        <h1
          className={`text-4xl font-bold text-red-500  ${pacifico.className}`}
        >
          Janun!
        </h1>
      </div>
      <form className="border-2 rounded-lg">
        <input className="w-96 p-3"></input>
        <button className="p-3 bg-red-400 rounded-r-lg">Search</button>
      </form>
      <img
        className="w-12 h-12 rounded-full border-2"
        src="un_user.jpg"
        alt="User Avatar"
      />
    </div>
  );
}
