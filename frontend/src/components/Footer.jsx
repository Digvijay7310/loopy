import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiShieldCheck } from "react-icons/hi";
import { IoHelpCircle, IoHomeOutline } from "react-icons/io5";
import {
  LuBookA,
  LuFileText,
  LuHardDriveUpload,
  LuMailQuestion,
  LuMessageCircleQuestion,
  LuUsers,
} from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-zinc-950 text-gray-300 py-10 px-6 w-full bottom-0 right-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-4">Loopy</h2>
          <p className="text-gray-400 max-w-xs">
            Share your favorite videos, connect with creators, and join the
            community.
          </p>
          <div className="flex space-x-4 mt-6">
            <Link to="#" aria-label="Facebook" className="hover:text-red-500">
              <FaFacebookF />
            </Link>
            <Link to="#" aria-label="Twitter" className="hover:text-red-500">
              <FaTwitter />
            </Link>
            <Link to="#" aria-label="Instagram" className="hover:text-red-500">
              <FaInstagram />
            </Link>
            <Link to="#" aria-label="YouTube" className="hover:text-red-500">
              <FaYoutube />
            </Link>
            <Link to="#" aria-label="LinkedIn" className="hover:text-red-500">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/users"
                className="flex items-center gap-2 hover:text-red-500 transition duration-200"
              >
                <IoHomeOutline />
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/videos/video-upload"
                className="flex items-center gap-2 hover:text-red-500 transition duration-200"
              >
                {" "}
                <LuHardDriveUpload />
                Upload
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-2 hover:text-red-500 transition duration-200"
              >
                <LuUsers />
                Channels
              </Link>
            </li>
            <li>
              <Link
                to="/videos/about"
                className="flex items-center gap-2 hover:text-red-500 transition duration-200"
              >
                <LuBookA />
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/users/help"
                className="flex items-center gap-2 hover:text-red-500 transition duration-200"
              >
                <IoHelpCircle /> Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/users/terms"
                className="flex items-center gap-2 hover:text-red-500 transition duration-200"
              >
                <LuFileText /> Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/users/privacy"
                className="flex items-center gap-2 hover:text-red-500 transition duration-200"
              >
                <HiShieldCheck />
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/users/faq"
                className="flex items-center gap-2 hover:text-red-500 transition duration-200"
              >
                <LuMessageCircleQuestion /> FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Subscribe to our Newsletter
          </h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your email"
              className="p-2 rounded bg-gray-800 text-gray-200 outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 transition text-white py-2 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Loopy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
