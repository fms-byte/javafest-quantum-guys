import Linktab from "@/app/components/Linktab";

export default function Navbar() {
  return (
    <div className="z-10 bg-white fixed left-0 max-w-screen-sm h-screen  shadow-[rgba(0,0,15,0.5)_1.5px_1.5px_1.5px_0px]">
      <div className="p-5">
        <div className="default">
          <ul className="p-2">
            <li>
              <Linktab logo="home.svg" goto="/timeline">
                Home
              </Linktab>
            </li>
            <li>
              <Linktab logo="channel.svg" goto="/channels">
                Channels
              </Linktab>
            </li>
          </ul>
        </div>
        {/* <div className="User Section">
          <div>
            <ul className="p-2">
              <li>You</li>
              <li>History</li>
              <li>Saved</li>
            </ul>
          </div>
          <div>
            <span className="px-2">Subscribed Channels</span>
          </div>
          <div>
            <span className="px-2">All Channels</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
