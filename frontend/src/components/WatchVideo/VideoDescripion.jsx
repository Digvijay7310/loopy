import { useState } from "react";

function VideoDescription({ description }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <button onClick={() => setShow((prev) => !prev)} className="text-sm text-red-500 mb-2">
        {show ? "Hide Description" : "Show Description"}
      </button>
      {show && (
        <p className="bg-gray-900 p-4 rounded whitespace-pre-line">{description}</p>
      )}
    </div>
  );
}

export default VideoDescription;
