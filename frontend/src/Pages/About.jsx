import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <main className="bg-zinc-900 min-h-screen text-white ">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4">
          <Link to="/" className="hover:text-green-600 transition-colors">
            Loopy
          </Link>
        </h2>
        <p className="text-xl sm:text-2xl mb-3">A video Sharing Platoform</p>
        <p className="text-xl mb-6">Upload Your video and watching videos</p>
        <form
          id="solutions"
          name="solutions"
          className="bg-zinc-800 py-3 px-5 rounded-2xl flex flex-col"
        >
          <h3 className="text-xl font-bold mb-4">
            {" "}
            Tell us your issue - we'll respond shortly
          </h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              id="tellus"
              name="tellus"
              placeholder="Describe your problem"
              className="bg-zinc-800 p-2 mb-1 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 transition-color text-white font-medium py-2 rounded-md cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default About;
