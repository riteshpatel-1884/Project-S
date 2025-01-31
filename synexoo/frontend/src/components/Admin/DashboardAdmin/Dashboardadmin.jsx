import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaBars, FaHome } from "react-icons/fa";

const Dashboardadmin = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("loggedInUser");

  const profileItems = [
    {
      name: "Profile",
      path: "/admin/profile",
      icon: <FaUserCircle size={20} />,
    },
    { name: "Logout", path: "/admin/login", icon: <FaSignOutAlt size={20} /> },
  ];

  const menuItems = [
    {
      name: "Users With Progress",
      path: "users",
      icon: <FaHome size={20} />,
    },
    {
      name: "Post Jobs",
      path: "post-jobs",
      icon: <FaHome size={20} />,
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
    navigate("/admin/login");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <nav className="navbar bg-white border-b border-gray-300 px-6 py-4 fixed top-0 left-0 w-full z-30">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              className="text-gray-800 hover:text-blue-500 transition-colors duration-200 -ml-5"
              onClick={toggleSidebar}
            >
              <FaBars size={24} />
            </button>
            
              <h2 className="text-2xl font-semibold">Full Stack</h2>
           
          </div>

          <div className="relative profile-dropdown">
            <FaUserCircle
              size={30}
              className="text-blue-600 hover:text-blue-400 cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownVisible && (
              <div className="absolute top-10 right-0 bg-white shadow-md rounded-md w-40">
                {loggedInUser && (
                  <div className="text-gray-800 text-center py-2 border-b border-gray-200">
                    Hi, Synexoo
                  </div>
                )}
                {profileItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className="flex items-center gap-2 p-2 hover:bg-blue-500 hover:text-white rounded-md text-gray-800 transition-colors duration-200"
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
        className={`fixed left-0 top-0 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "250px", marginTop: "70px" }}
      >
        <ul className="space-y-2 p-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-500 text-white font-semibold"
                      : "text-gray-800 hover:bg-blue-100"
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

      {/* Render nested routes */}
      <div className="mt-20 p-6">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboardadmin;
