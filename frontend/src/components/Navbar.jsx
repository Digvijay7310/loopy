import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { LuArrowRightLeft, LuFileVideo, LuHouse, LuLogOut, LuMenu, LuThumbsUp, LuUpload, LuUser } from 'react-icons/lu'
import {  LiaComments } from 'react-icons/lia'
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router-dom'
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

function Navbar() {
  useEffect(()=> {
    AOS.init({duration:700, once:true,})
  }, [])

  const [isOpen, setIsOpen] = useState(false);

  const menuToggle = () => {
    setIsOpen(prev => !prev);
  }

  const menuRef = useRef(null)

  // Menu click outside

  useEffect(()=> {
    const handleClickOutSide =(e)=> {
      if(menuRef.current && !menuRef.current.contains(e.target)){
        setIsOpen(false)
      }
    };

    if(isOpen){
      document.addEventListener('mousedown', handleClickOutSide)
    } else {
      document.addEventListener('mousedown', handleClickOutSide)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  }, [isOpen])
  return (
    <>
    <header data-aos="slide-down" className='bg-black px-1 py-2 flex justify-evenly items-center top-0 left-0 fixed w-full z-50' role='banner'>
      {/* logo */}
      <Link to="/">
        <img src="/logo.png" alt="logo" className='h-10 sm:h-[60px]' />
      </Link>

      {/* Search bar */}
      <form className="flex shadow-sm shadow-zinc-100" role='search' area-label='Site Search'>
        <label htmlFor="search" className='sr-only'>Search</label>
        <input type="search" name="search" id="search"
        placeholder='Search here'
        className='cursor-context-menu rounded p-1 text-white
         bg-zinc-900 outline-0 border-0 ring ring-red-600
         sm:w-[380px] sm: h-10'
        />
        <button className='bg-red-500 text-white font-light sm:w-[30px]'>
          <FaSearch size={15} className='sm:size-5 font-extralight'/>
          </button>
      </form>

      {/* Navbar */}
      <nav className='flex justify-between items-center sm:gap-6'
      role='navigation' aria-label='Main navigation'>

          <Link to="/users/profile">
          <button className='bg-zinc-900 px-0.5 py-1.5 cursor-pointer text-white rounded-full'
          aria-label='Go to Profile'>
            <LuUser size={20} className='sm:size-8'/>
            </button>
            </Link>

           {/* MEnu toggle */}
            <button onClick={menuToggle} className='text-white cursor-pointer' 
            aria-label='toggle menu' aria-expanded={isOpen} >{
              isOpen ? <RxCross1 size={20} className='sm:size-8'/> : <LuMenu size={20} className='sm:size-8' />} </button>

              
      </nav>

    </header>

    {/* Animation slide value */}

     <div
        ref={menuRef}
        className={`transition-all duration-300 ease-in-out fixed top-[50px] right-0 w-auto bg-black text-white z-40 overflow-hidden 
        ${isOpen ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 pointer-events-none'}
        `}
      >
        <div className='flex flex-col p-4'>
          <Link to="/users" className='py-2 hover:text-red-500'>
           <button className='flex justify-between items-center gap-2 text-lg'><LuHouse /> Home </button></Link>
          <Link to="/users/profile" className='py-2 hover:text-red-500'>
           <button className='flex justify-between items-center gap-2 text-lg'><LuUser/> Profile </button></Link>
          <Link to="/videos/upload" className='py-2 hover:text-red-500'>
           <button className='flex justify-between items-center gap-2 text-lg'><LuUpload/> Upload </button></Link>
          <Link to="/videos/my-likes" className='py-2 hover:text-red-500'>
           <button className='flex justify-between items-center gap-2 text-lg'><LuThumbsUp/> My Likes </button></Link>
          <Link to="/videos/my-comments" className='py-2 hover:text-red-500' >
           <button className='flex justify-between items-center gap-2 text-lg'><LiaComments/> My Comments </button></Link>
          <Link to="/videos/my-videos" className='py-2 hover:text-red-500'>
           <button className='flex justify-between items-center gap-2 text-lg'><LuFileVideo/> My Videos </button></Link>
          <Link to="/users/logout" className='py-2 hover:text-red-500'>
           <button className='flex justify-between items-center gap-2 text-lg'><LuLogOut/> Logout </button></Link>
        </div>
      </div>

      {/* Spacer */}
      <div className='h-[55px]'></div>
    </>
  )
}

export default Navbar