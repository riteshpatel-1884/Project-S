import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";

const SidebarLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mt-[70px] p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
