import React from "react";

function HelpCenter() {
  return (
    <div className="bg-zinc-900 min-h-screen p-6 text-white">
      <div>
        <h3>Welcome to the Loopy Help Centet!</h3>
        <h2>Popular Topics:</h2>
        <ul className="list disc list-inside">
          <li>Getting Stary</li>
          <ul>
            <li>How to create an account</li>
            <li>How to edit your profile</li>
          </ul>
          <li>Uploading & Managing Videos</li>
          <ul>
            <li>Upload limits and supported formats</li>
            <li>Changing video visibility</li>
          </ul>
          <li>Account & Settings</li>
          <ul>
            <li>Resetting you password</li>
            <li>Managing your profile privacy</li>
          </ul>
          <li>Community Guidelines</li>
          <ul>
            <li>What content is allowed</li>
            <li>Reporting violations</li>
          </ul>
          <li>Technical Support</li>
          <ul>
            <li>Video not playing?</li>
            <li>Login issues?</li>
          </ul>
        </ul>
        <p>
          Still have questions? Contact us at: <span>support@loopyapp.com</span>
        </p>
      </div>
    </div>
  );
}

export default HelpCenter;
