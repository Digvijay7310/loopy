import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiSearchLine, RiVideoUploadLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { LiaCommentsSolid } from "react-icons/lia";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (
    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 text-sm">
      <NavLinkItem to="/" label="Home" icon={<IoHomeOutline />} />
      <NavLinkItem
        to="/dashboard"
        label="Dashboard"
        icon={<MdOutlineDashboard />}
      />
      <NavLinkItem
        to="/video-upload"
        label="Upload"
        icon={<RiVideoUploadLine />}
      />
      <NavLinkItem to="/my-likes" label="Likes" icon={<SlLike />} />
      <NavLinkItem
        to="/my-comments"
        label="Comments"
        icon={<LiaCommentsSolid />}
      />
      <NavLinkItem to="/my-profile" label="Profile" icon={<LuUserRound />} />
    </div>
  );

  return (
    <div className="bg-gray-900 px-4 py-5 ">
      <nav className="flex items-center justify-between px-4 gap-4">
        {/* Logo */}
        <div className="text-gray-200 text-xl md:text-2xl lg:text-3xl">
          Loopy
        </div>

        {/* Search Bar - Always Visible */}
        <form className="flex items-center w-full max-w-md mx-4 flex-grow">
          <input
            className="text-gray-200 w-full p-2 text-sm bg-gray-700 outline-0"
            type="search"
            placeholder="Search Here..."
            autoComplete="off"
            name="search"
            id="search"
          />
          <button
            className="bg-green-600 text-white h-9 w-10 flex justify-center items-center"
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
          className="lg:hidden text-gray-200 text-2xl"
          aria-label="Open menu"
        >
          <HiOutlineMenuAlt1 />
        </button>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gray-800 text-white p-5 z-50 transform transition-transform duration-300 ${
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
          ? "bg-green-600 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

export default Navbar;
