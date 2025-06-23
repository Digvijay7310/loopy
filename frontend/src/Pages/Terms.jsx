import React from "react";
import { FaAddressBook } from "react-icons/fa";

function Terms() {
  return (
    <div className="bg-zinc-900 min-h-screen text-white p-6">
      <div className="bg-zinc-800 rounded-xl p-4">
        <h3 className="font-bold space-x-1 text-2xl flex gap-2">
          <FaAddressBook />
          Effective Date {Date.now()}
        </h3>
        <div>
          <p className="font-extralight">
            These Terms goven your use of loopy. By accessing Loopy, you agree
            to be bound by these terms.
          </p>

          <ol className="list-decimal pl-6 mt-1 ">
            <li className="font-semibold my-2">User Account</li>
            <ul className="list-disc pl-5 font-light">
              <li>Must be 13+ years old</li>
              <li>Provide accurate information</li>
              <li>You are responsible for account activity</li>
            </ul>
            <li className="font-semibold my-2">Content Policy</li>
            <ul className="list-disc pl-5 font-light">
              <li>No hate speech, nudity, or illegal content</li>
              <li>Loopy can remove content that violates fuidelines</li>
            </ul>
            <li className="font-semibold my-2">Interllectual Property</li>
            <ul className="list-disc pl-5 font-light">
              <li>You retain rights to your uploaded content</li>
              <li>
                By uploading, you give us a licence to show it on the platform
              </li>
            </ul>
            <li className="font-semibold my-2">Limitiations of Liability</li>
            <ul className="list-disc pl-5 font-light">
              <li>We have limit some restictions</li>
              <li>No nuditity and hate speech and illegal content</li>
            </ul>
            <li className="font-semibold my-2">Account Termination</li>
            <ul className="list-disc pl-5 font-light">
              <li>
                We reserve the right to suspent or delete accounts that violate
                these terms
              </li>
            </ul>
            <li className="font-semibold my-2">Modifications</li>
            <ul className="list-disc pl-5 font-light">
              <li>
                We may change these terms anytime. Continued use implies
                acceptance.
              </li>
            </ul>
            <li className="font-semibold my-2">Contact</li>
            <ul className="list-disc pl-5 font-light">
              <li>
                Questions ? Email:{" "}
                <a
                  href="_blank"
                  className="text-red-500 font-semibold cursor-pointer"
                >
                  legal@loopy.com
                </a>
              </li>
            </ul>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Terms;
