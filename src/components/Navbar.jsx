import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="flex justify-center
    items-center bg-blue-500 py-3 gap-5"
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-white text-2xl" : "text-gray-300 text-2xl"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/newpost?mode=new"
        className={({ isActive }) =>
          `text-2xl ${isActive ? "text-white" : "text-gray-300"}`
        }
      >
        New Post
      </NavLink>
    </nav>
  );
}
