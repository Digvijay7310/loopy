import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import FeaturedVideos from '../components/FeaturedVideos';
import FrequentlyAskedQuestion from '../components/FAQ/FrequentlyAskedQuestion';
import { LuArrowBigRight, LuSquareArrowLeft } from 'react-icons/lu';
import { FaArrowCircleRight } from 'react-icons/fa';


function RoutePage() {


  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  

  return (
    <div className="bg-black text-gray-100">
      {/* Hero Section */}
      <section className="relative text-white h-[50vh] md:h-[100vh] py-20 px-6 md:px-16 md:m-10 rounded-4xl overflow-hidden">
  {/* Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
  >
    <source src="/WAR2.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay Content */}
  <div className="relative z-10 max-w-6xl mx-auto text-center top-10" data-aos="fade-down">
    <h1 className="text-3xl md:text-5xl font-bold mb-6">
      Discover, Watch & Share Amazing Videos
    </h1>
    <p className="text-lg md:text-lg text-indigo-100 mb-8">
      Join the community of creators and viewers around the world.
    </p>
    <Link to="/users/login">
      <button className="bg-white hover:cursor-pointer duration-100 text-3xl text-red-600 font-semibold py-3 px-6 rounded-full shadow hover:bg-red-600 hover:text-white transition">
        Get Started 
      </button>
    </Link>
  </div>

  {/* Optional: Dark overlay for better readability */}
  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-[1]"></div>
</section>


      {/* Featured Videos */}
      <section className="p-4">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-3xl font-bold mb-10 text-center"
            data-aos="fade-up"
          >
            Featured Videos
          </h2>

         <FeaturedVideos />
        </div>

        <div className="m-auto">
          <h2 className='text-3xl md:text-4xl font-bold mb-10 text-center'>
            Frequently Asked Question
          </h2>

          <FrequentlyAskedQuestion />
        </div>
      </section>


    </div>
  );
}

export default RoutePage;
