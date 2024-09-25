import { useState } from "react";

export default function Channelcard({
  channelName,
  channelDes,
  channelImg, //to be fixed
  subStatus,
  subCount,
  subscriber,
  channelSlug,
}) {
  const [subbed, setSubbed] = useState(subStatus);

  return (
    <div className="relative p-6 m-4 w-2/3 bg-white flex items-center space-x-4 rounded-lg shadow-md">
      <img className="w-40 h-40 rounded-full" src="p2.jpeg" alt="User Avatar" />
      <div className="max-w-96">
        <h2 className="text-gray-950 font-medium text-xl mb-1">
          {channelName}
        </h2>
        <span className="text-xs">{subCount} subscribers</span>
        <p className="text-sm">{channelDes}</p>
      </div>
      <button
        className={`absolute right-12 ${
          !subbed ? "bg-red-400" : "bg-gray-300"
        } rounded-xl px-2 py-1 hover:bg-red-200`}
        onClick={() => {
          // console.log(channelSlug);
          subscriber(channelSlug, subbed);
          setSubbed((subbed) => !subbed);
        }}
      >
        {subbed ? "Unsubscribe" : "Subscribe"}
      </button>
    </div>
  );
}
