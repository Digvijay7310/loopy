import React from "react";
import { FaHandsHelping } from "react-icons/fa";

function HelpCenter() {
  return (
    <div className="bg-zinc-900 min-h-screen p-6 text-white font-extralight">
      <div className="p-4 bg-zinc-800 rounded-2xl">
        <h3 className="text-center text-2xl font-bold flex ">
          <FaHandsHelping className="text-2xl" />
          Welcome to the Loopy Help Center!
        </h3>
        <h2 className="font-semibold">Popular Topics:</h2>
        <ol className="list-decimal list-inside">
          <li className="font-semibold my-4">Getting Start</li>
          <ul className="pl-5 font-light list-disc">
            <li>How to create an account</li>
            <li>How to edit your profile</li>
          </ul>
          <li className="font-semibold my-4">Uploading & Managing Videos</li>
          <ul className="pl-5 font-light list-disc">
            <li>Upload limits and supported formats</li>
            <li>Changing video visibility</li>
          </ul>
          <li className="font-semibold my-4">Account & Settings</li>
          <ul className="pl-5 font-light list-disc">
            <li>Resetting you password</li>
            <li>Managing your profile privacy</li>
          </ul>
          <li className="font-semibold my-4">Community Guidelines</li>
          <ul className="pl-5 font-light list-disc">
            <li>What content is allowed</li>
            <li>Reporting violations</li>
          </ul>
          <li className="font-semibold my-4">Technical Support</li>
          <ul className="pl-5 font-light list-disc">
            <li>Video not playing?</li>
            <li>Login issues?</li>
          </ul>
        </ol>
        <p>
          Still have questions? Contact us at: <span>support@loopyapp.com</span>
        </p>
      </div>
    </div>
  );
}

export default HelpCenter;
