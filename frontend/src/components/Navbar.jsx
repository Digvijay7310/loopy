import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import {
  LuHardDriveUpload,
  LuLogIn,
  LuUserPlus,
  LuUserRound,
} from "react-icons/lu";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (
    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 text-sm">
      <NavLinkItem to="/users" label="Home" icon={<IoHomeOutline />} />

      <NavLinkItem
        to="/videos/upload"
        label="Upload"
        icon={<LuHardDriveUpload />}
      />
      <NavLinkItem to="/users/profile" label="Profile" icon={<LuUserRound />} />

      <NavLinkItem
        to="/users/register"
        label="Register"
        icon={<LuUserPlus />}
      />
      <NavLinkItem to="/users/login" label="Login" icon={<LuLogIn />} />
    </div>
  );

  return (
    <div className="bg-zinc-950 px-4  ">
      <nav className="flex items-center justify-between px-6 py-4 shadow-md ">
        {/* Logo */}
        <div className="text-gray-200 text-xl md:text-2xl  lg:text-4xl">
          Loopy
        </div>

        {/* Search Bar - Always Visible */}
        <form className="flex items-center w-full max-w-md mx-4 flex-grow">
          <input
            className="text-gray-200 w-full p-2 text-sm bg-zinc-800 outline-0 rounded-l-xl"
            type="search"
            placeholder="Search Here..."
            autoComplete="off"
            name="search"
            id="search"
          />
          <button
            className="bg-red-600 text-white h-9 w-10 flex justify-center items-center rounded-r-xl"
            type="submit"
          >
            <RiSearchLine className="text-lg font-bold" />
          </button>
        </form>

        {/* Desktop Links: Only show on lg and up */}
        <div className="hidden lg:flex items-center gap-4">{navLinks}</div>

        {/* Hamburger Menu Button: show on md and below */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden text-gray-200 text-2xl cursor-pointer"
          aria-label="Open menu"
        >
          <HiOutlineMenuAlt1 />
        </button>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-zinc-800 text-white p-5 z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">Menu</div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl cursor-pointer"
            aria-label="Close menu"
          >
            <RxCross2 />
          </button>
        </div>
        <div className="flex flex-col gap-3">{navLinks}</div>
      </div>
    </div>
  );
}

// NavLinkItem Component
const NavLinkItem = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
        isActive
          ? "bg-red-600 text-white"
          : "text-white-300 bg-zinc-800 text-white hover:bg-zinc-900 "
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

export default Navbar;
