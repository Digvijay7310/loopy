import React from "react";
import { FaBookReader } from "react-icons/fa";

function PrivacyPolicy() {
  return (
    <div className="bg-zinc-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6  flex gap-2">
        <FaBookReader /> Privacy Policy
      </h1>
      <p className="mb-4"> Effective Date: {Date.now()}</p>
      <p className="mt-2">
        Loopy respects your privacy. This policy outlines what information we
        collect, how are use it, and your rights.
      </p>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">1. Information We Collect:</h2>
          <ul className="list-disc list-inside">
            <li>Name, email, phone (during registration) </li>
            <li>Uploaded videos and interactions (likes, comments)</li>
            <li>Device and browser info (For analytics)</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            <ul className="list disc list-inside">
              <li>To personalize your experience</li>
              <li>To imporve our platform and detect fraud</li>
              <li>To communicate important updates</li>
            </ul>
          </h2>
        </div>
        <div>
          <h2>3. Sharing of Data</h2>
          <p>
            We do not sell your data. We may share data with service provides
            (e.g: for cloud storage) understrict confidentiality.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold">4. Cookies</h2>
          <p>We use cookies to improive performance and user experience.</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold">5. Your Rights</h2>
          <ul className="list disc list-inside">
            <li>Access, update, or delete your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold">6. Data SEcurity</h2>
          <p>We follow industry standards to secure you data</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold">Contact</h2>
          For privacy concerns, email us ata privacy@loopy.com
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
