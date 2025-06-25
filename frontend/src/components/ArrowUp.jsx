import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

function ArrowUp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 x-50 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
      >
        <FaArrowAltCircleUp className="w-5 h-5" />
      </button>
    )
  );
}

export default ArrowUp;
