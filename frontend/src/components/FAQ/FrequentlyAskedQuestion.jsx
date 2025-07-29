import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

function FrequentlyAskedQuestion() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const faqs = [
    {
      question: 'What is Loopy?',
      answer:
        'Loopy is a frontend video-sharing platform prototype, similar to Netflix or YouTube. It demonstrates skills in modern UI/UX, animations, and multimedia handling with a focus on performance and scalability.',
    },
    {
      question: 'How is the video background implemented?',
      answer:
        'A native <video> element is used inside the hero section with autoPlay, loop, muted, and playsInline attributes. It’s styled using absolute positioning and object-cover for a seamless full-screen experience.',
    },
    {
      question: 'How are images and videos stored?',
      answer:
        'All media assets like .mp4 and .jpg are stored in the public/ folder (Vite’s static hosting path), ensuring they load without imports or bundler processing.',
    },
    {
      question: 'What’s under the hood?',
      answer:
        'Loopy uses React (Vite) for the frontend, Tailwind CSS for styling, AOS for scroll animations, React Router for navigation, and Axios for future API communication.',
    },
    {
      question: 'What are the future plans?',
      answer:
        'Planned features include user authentication, video upload via admin panel, like/comment/share system, cloud storage (Firebase/Cloudinary), and video search & filters.',
    },
    {
      question: 'Who is this project for?',
      answer:
        'Loopy is designed for developers learning frontend architecture, designers exploring rich UI interfaces, and recruiters looking for hands-on project experience with React.',
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen py-12 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10" data-aos="fade-down">
          🎥 Loopy – Project Overview & FAQ
        </h1>

        <section className="mb-12" data-aos="fade-up">
          <p className="text-lg leading-relaxed text-gray-300 mb-4">
            Loopy is a modern, responsive video discovery platform — like a mini Netflix. It's built using React + Vite and features immersive visuals such as a looping background video, animated UI elements, and modular architecture.
          </p>
          <ul className="list-disc pl-5 text-gray-300">
            <li>🎬 Dynamic video hero section</li>
            <li>📺 Reusable featured video components</li>
            <li>📱 Fully responsive layout with AOS animation</li>
            <li>🔌 Axios setup for future API integration</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6" data-aos="fade-up">❓ Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg p-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center" data-aos="fade-up">
          <Link to="/" className="inline-block bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition">
            🔙 Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FrequentlyAskedQuestion;
