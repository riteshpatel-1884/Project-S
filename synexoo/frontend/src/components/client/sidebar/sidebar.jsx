import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "dashboard",
      icon: <FaHome size={20} />,
    },
   
  
  ];

  return (
    <div
      className="sidebar bg-gray-100 h-screen fixed top-0 left-0 border-r"
      style={{ width: "70px", marginTop: "70px" }} // Adjust margin-top to account for the navbar
    >
      <ul className="space-y-3 pt-8">
        {menuItems.map((item, index) => (
          <li key={index} className="group relative">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 rounded-md bg-blue-500 text-white font-semibold flex items-center justify-center ml-2 mr-2"
                  : "block px-4 py-2 rounded-md hover:bg-blue-100 text-gray-800 flex items-center justify-center ml-2 mr-2"
              }
            >
              {item.icon}
            </NavLink>
            <span className="absolute w-36 text-center left-full ml-2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[-10px] transition-all">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
