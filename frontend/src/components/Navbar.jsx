import React,{useRef, useEffect} from "react";
import {
  LuCat,
  LuCross,
  LuHouse,
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuSearch,
  LuThumbsUp,
  LuTrendingUp,
  LuUpload,
  LuUserRound,
  LuVideo,
} from "react-icons/lu";
import {
  FaComment,
  FaUpload,
} from "react-icons/fa";
import {
  MdOutlineExplore,
  MdOutlineReportOff,
  MdOutlineRoundaboutLeft,
} from "react-icons/md";
import { RxCross2 } from 'react-icons/rx'
import { Link } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';
// import axiosInstance from "../axios";

function Navbar() {
  const [submit, setSubmit] = React.useState('')
  const [menu, setMenu] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [largeScreenMenu, setLargeScreenMenu] = React.useState(false)

  const menuRef = useRef(null);
  const seachRef = useRef(null);
  const lgMenuRef = useRef(null);

  const toggleSearch = () => {
    setSearch((prev) => !prev);
  };

  const toggleMenu = () => setMenu((prev) => !prev);
  

  const toggleLgMenu = () => setLargeScreenMenu(prev => !prev)
  

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log("Search", submit)
  }


  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if(seachRef.current && !seachRef.current.contains(e.target)) setSearch(false)
        
      if(menuRef.current && !menuRef.current.contains(e.target)) setMenu(false)

      if(lgMenuRef.current && !lgMenuRef.current.contains(e.target)) setLargeScreenMenu(false)

    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // for animation
  useEffect(() => {
    Aos.init({duration: 500, once:true})
  })

  

  // React.useEffect(() => {
  //   const res = axiosInstance("videos/search?")
  //   console.log(res.data.data)
  // }, [])
  
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between md:justify-evenly items-center md:h-[80px] bg-black text-white px-4 py-2 shadow-md">
        {/* Logo */}
        <Link
        to="/"
        className="flex items-center gap-2">
          <img src="/logo.svg" alt="Loopy Logo"
            className="h-10 rounded-full" />
        </Link>

        {/* Search On large screen */}
        <form
          onSubmit={handleOnSubmit}
          id="search-bar-large-screen"
          className="hidden md:flex items-center bg-zinc-900 ring-1 ring-gray-200 hover:ring-red-500 rounded-4xl px-3 py-1 w-[200px] md:w-[400px]">
          <input
            onChange={(e) => setSubmit(e.target.value)}
            type="search"
            name="search-anything"
            placeholder="Search videos and creators"
            className="bg-transparent outline-none text-sm text-white ml-2 w-full px-1 py-2"
          />
        </form>

        {/* Desktop Routes */}
        <div className="hidden md:flex items-center gap-5 text-xl">
          <Link
            to="/users"
            title="Home"
            className="text-white"
          >
            <LuHouse />
          </Link>

          <Link
            to="/videos/upload"
            aria-expanded="Upload"
            title="Upload video"
            className="text-white"
          >
            <LuUpload />

          </Link>


          <Link
            to="/users/profile"
            title="profile"
            className="text-white"

          >
            <LuUserRound />
          </Link>

        </div>

        {/* Right Menu */}
        <div
          title="toggle search for loopy"
          className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleSearch}
            className="text-2xl h-[50px] w-[50px]"
          >
            {search ? <RxCross2 /> : <LuSearch />}{" "}
          </button>
          <Link to="/users/profile" title="Profile" >
            <LuUserRound size={20} />
          </Link>
          <button
            onClick={toggleMenu}
            title="Menu"
            className="md:hidden text-xl flex justify-center items-center  h-[50px] w-[50px]"
          >
            {menu ? <RxCross2 size={25} /> : <LuMenu size={25} />}
          </button>
        </div>

        {/* Big screen menu button */}
        <div
          title="Menu"
          className="hidden md:flex md:justify-center md:items-center h-[50px] w-[50px]">
          <button
            title="Loopy Menu"
            onClick={toggleLgMenu}>
            {largeScreenMenu ? <RxCross2 size={25} /> : <LuMenu size={25} />}
          </button>
        </div>
      </header>

      {/* Search on small screen */}
      <div
        className="transition-all duration-300 ease-in-out flex justify-center items-center">

        {search && (
          <div
          ref={seachRef}
          data-aos="fade-down"
            title="search"
            className="fixed  bg-black text-white w-[300px] shadow-2xl flex justify-center items-center z-50  md:hidden">

            <form
              onSubmit={handleOnSubmit}
              id="search-bar"
              className=" fixed top-[60px] flex bg-zinc-800 ring-1 ring-zinc-200 fo rounded-4xl h-[40px] w-[300px]">

              <input
                onChange={(e) => setSubmit(e.target.value)}
                title="search on loopy"
                type="search"
                name="search anything"
                placeholder="Search videos and creators"
                className="text-white p-2 w-5/6 rounded-l-4xl border-0 outline-0"
              />
              <button
                title="search for loopy"
                type="Button"
                className="bg-black hover:bg-red-500 duration-200 cursor-pointer flex justify-center items-center p-2 text-white rounded-r-4xl w-1/6">
                <LuSearch size={20} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menu && (
        <div
        ref={menuRef}
        data-aos="fade-left"
        className="md:hidden fixed top-[60px] right-0 bg-black text-white w-[200px] shadow-lg rounded-bl-lg p-3 flex flex-col gap-3 z-40">
          <Link
            to="/users"
            title="Home"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >

            <LuHouse className="inline-block align-middle" size={20} /> Home


          </Link>

          <Link
            to="/users/profile"
            title="Profile"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuUserRound className="inline-block align-middle" size={20} /> Profile
          </Link>

          <Link
            to="/videos/upload"
            title="Video upload"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <FaUpload className="inline-block align-middle" size={20} /> Upload
          </Link>

          <Link
            to="/videos/my-likes"
            title="My Likes"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuThumbsUp className="inline-block align-middle" size={20} /> Likes
          </Link>

          <Link
            to="/videos/my-comments"
            title="My Comments"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <FaComment className="inline-block align-middle" size={20} /> Comments
          </Link>

          <Link
            to="/explore"
            title="Explore"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <MdOutlineExplore className="inline-block align-middle" size={20} /> Explore
          </Link>

          <Link
            to="/categories"
            title="Cateogry"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuCat className="inline-block align-middle" size={20} /> Categories
          </Link>

          <Link
            to="/videos"
            title="New Videos"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuVideo className="inline-block align-middle" size={20} /> New Videos
          </Link>

          <Link
            to="/trending"
            title="Trending"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuTrendingUp className="inline-block align-middle" size={20} /> Trending
          </Link>

          <Link
            to="/dashboard"
            title="Dashboard"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuLayoutDashboard className="inline-block align-middle" size={20} /> Dashboard
          </Link>

          <Link
            to="/about"
            title="About"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <MdOutlineRoundaboutLeft className="inline-block align-middle" size={20} /> About
          </Link>

          <Link
            to="/report"
            title="Report Video"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <MdOutlineReportOff className="inline-block align-middle" size={20} /> Report
          </Link>

          <Link
            to="/logout"
            title="logout"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuLogOut className="inline-block align-middle" size={20} /> Logout
          </Link>
        </div>
      )}


      {/* Large Dropdown Menu */}
      {largeScreenMenu && (
        <div 
        ref={lgMenuRef}
        data-aos="fade-down"
        className="hidden fixed top-[80px] right-0 bg-black text-white w-[200px] shadow-lg rounded-bl-lg p-3 md:flex flex-col gap-3 z-40">

          <Link
            to="/videos/upload"
            title="Video Upload"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuUpload className="inline-block align-middle" size={20} /> Upload
          </Link>

          <Link
            to="/videos/my-likes"
            title="My Likes"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuThumbsUp className="inline-block align-middle" size={20} /> Likes
          </Link>

          <Link
            to="/videos/my-comments"
            title="My Comments"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <FaComment className="inline-block align-middle" size={20} /> Comments
          </Link>

          <Link
            to="#explore"
            title="Explore"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <MdOutlineExplore className="inline-block align-middle" size={20} /> Explore
          </Link>

          <Link
            to="#categories"
            title="Cateogry"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuCat className="inline-block align-middle" size={20} /> Categories
          </Link>

          <Link
            to="#videos"
            title="New Videos"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuVideo className="inline-block align-middle" size={20} /> New Videos
          </Link>

          <Link
            to="#trending"
            title="Trending"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuTrendingUp className="inline-block align-middle" size={20} /> Trending
          </Link>

          <Link
            to="#dashboard"
            title="Dashboard"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuLayoutDashboard className="inline-block align-middle" size={20} /> Dashboard
          </Link>

          <Link
            to="#about"
            title="About"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <MdOutlineRoundaboutLeft className="inline-block align-middle" size={20} /> About
          </Link>

          <Link
            to="#report"
            title="Report a Video"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <MdOutlineReportOff className="inline-block align-middle" size={20} /> Report
          </Link>

          <Link
            to="/users/logout"
            title="Logout"
            className="hover:text-red-500 duration-300 flex justify-start items-center gap-4"
          >
            <LuLogOut className="inline-block align-middle" size={20} /> Logout
          </Link>
        </div>
      )}
      <div className="mt-[66px] md:mt-[66px] bg-black"></div>
    </>
  );
}

export default Navbar;
