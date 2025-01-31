import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCode,
  FaCalendarWeek,
  FaQuestionCircle,
  FaBriefcase,
  FaProjectDiagram,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("loggedInUser");

  const profileItems = [
    { name: "Profile", path: "/profile", icon: <FaUserCircle size={20} /> },
    { name: "Logout", path: "/login", icon: <FaSignOutAlt size={20} /> },
  ];

  const menuItems = [
    {
      name: "Dashboard",
      path: "dashboard",
      icon: <FaHome size={20} />,
    },
    {
      name: "150 DSA Questions",
      path: "150-dsa-questions",
      icon: <FaCode size={20} />,
    },
    {
      name: "Weekly Series",
      path: "weekly-series",
      icon: <FaCalendarWeek size={20} />,
    },
    {
      name: "HR Questions",
      path: "hr-questions",
      icon: <FaQuestionCircle size={20} />,
    },
    {
      name: "Job Applications",
      path: "apply",
      icon: <FaBriefcase size={20} />,
    },
    {
      name: "Projects",
      path: "projects",
      icon: <FaProjectDiagram size={20} />,
    },
  ];

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setDropdownVisible(false);
      }
    };
    document.body.classList.add("dark");

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <nav className="navbar bg-gray-900 border-gray-700 px-6 py-4 fixed top-0 left-0 w-full z-30">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              className="text-white hover:text-blue-500 transition-colors duration-200 -ml-5"
              onClick={toggleSidebar}
            >
              <FaBars size={24} />
            </button>
            <h2 className="text-2xl font-semibold text-white">Full Stack</h2>
          </div>

          <div className="relative profile-dropdown">
            <FaUserCircle
              size={30}
              className="text-white hover:text-blue-400 cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownVisible && (
              <div className="absolute top-10 right-0 bg-gray-800 shadow-md rounded-md w-40">
                {loggedInUser && (
                  <div className="text-gray-300 text-center py-2 border-b border-gray-700">
                    Hi, {loggedInUser}
                  </div>
                )}
                {profileItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className="flex items-center gap-2 p-2 hover:bg-blue-500 hover:text-white rounded-md text-gray-300 transition-colors duration-200"
                    onClick={() => {
                      if (item.name === "Logout") {
                        handleLogout();
                      } else {
                        setDropdownVisible(false);
                      }
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Animated Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: "250px",
          marginTop: "70px",
          backgroundColor: "#2D3748",
        }}
      >
        <ul className="space-y-2 p-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 text-gray-300 ${
                    isActive
                      ? "bg-blue-500 text-white font-semibold"
                      : "hover:bg-white hover:text-black"
                  }`
                }
                onClick={() => setSidebarVisible(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
