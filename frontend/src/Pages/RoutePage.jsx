import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import VideoCard from '../components/VideoCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

function RoutePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosInstance.get('/videos/videos', {
          withCredentials: true,
        });
        setFeatured(res.data.data || []);
      } catch (err) {
        console.error('Failed to load featured videos', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-zinc-800 text-gray-100">
      {/* Hero Section */}
      <section style={{
        backgroundImage: "url('/coverImage.jpg')",
        opacity: "10px",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} className=" text-white py-20 px-6 md:px-16 opacity-90">
        <div className="max-w-6xl mx-auto text-center" data-aos="fade-down">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover, Watch & Share Amazing Videos
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8">
            Join the community of creators and viewers around the world.
          </p>
          <Link to="/users/login">
          <button className="bg-white text-red-600 font-semibold py-3 px-6 rounded-full shadow hover:bg-indigo-100 transition">
            Get Started
          </button>
          </Link>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-bold mb-10 text-center"
            data-aos="fade-up"
          >
            Featured Videos
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading videos...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((video, i) => (
                <div
                  key={video._id}
                  data-aos="zoom-in-up"
                  data-aos-delay={i * 100}
                >
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-zinc-800 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-bold mb-10"
            data-aos="fade-up"
          >
            Explore Categories
          </h2>
          <div
            className="flex flex-wrap justify-center gap-4"
            data-aos="fade-up"
          >
            {['Music', 'Gaming', 'Education', 'Sports', 'News', 'Vlogs'].map(
              (cat, idx) => (
                <button
                  key={cat}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full shadow hover:opacity-90 transition"
                  data-aos="flip-up"
                  data-aos-delay={idx * 100}
                >
                  {cat}
                </button>
              )
            )}
          </div>

        </div>
      </section>
    </div>
  );
}

export default RoutePage;
