import React from "react";
import home from "../assets/icons/home.svg";
import folder from "../assets/icons/folder.svg";
import logout from "../assets/icons/logout.svg";
import people from "../assets/icons/people.svg";
import profile from "../assets/icons/profile.svg";

const Sidebar = () => {
  return (
   <div className="w-64 h-screen bg-[#A7AAE9]/39 p-6 flex flex-col rounded-20">

  {/* TOP: Logo + Menu */}
  <div>
    {/* Logo */}
    <div className="flex flex-col items-start mb-10">
      <div className="bg-purple-800 text-white w-10 h-10 flex items-center justify-center rounded-full mb-4">
        ✦
      </div>
      <h1 className="text-purple-600 font-bold text-lg">
        NAME OF THE PLATFORM
      </h1>
    </div>

    {/* OVERVIEW */}
    <div className="mb-6">
      <p className="text-gray-500 text-xs font-semibold mb-2">
        OVERVIEW
      </p>

      <div className="flex flex-col gap-2">
        <button className="flex items-center gap-3 px-4 py-2 bg-white text-[#2f327d] rounded-lg font-medium">
          <img src={home} className="w-5 h-5" />
          Dashboard
        </button>

        <button className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-white hover:text-[#702DFF]">
          <img src={folder} className="w-5 h-5" />
          Courses
        </button>
      </div>
    </div>

    {/* COMMUNITY */}
    <div>
      <p className="text-gray-500 text-xs font-semibold mb-2">
        COMMUNITY
      </p>

      <button className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-white hover:text-[#702DFF]">
        <img src={people} className="w-5 h-5" />
        Trisomy 21
      </button>
    </div>
  </div>

  {/* BOTTOM: SETTINGS */}
  <div className="mt-auto">
    <p className="text-gray-500 text-xs font-semibold mb-2">
      SETTINGS
    </p>

     
      <button className="flex items-center gap-3 px-4 py-2 text-red-500 rounded-lg hover:bg-red-100 hover:text-red-600">
        <img src={logout} className="w-5 h-5" />
        Logout
      </button>
    </div>
  </div>


   );
};

export default Sidebar;