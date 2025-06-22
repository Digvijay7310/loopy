import React from "react";

function Terms() {
  return (
    <div className="bg-zinc-900 min-h-screen text-white p-6">
      <div>
        <h3>Effective Date {Date.now()}</h3>
        <div>
          <p>
            These Terms goven your use of loopy. By accessing Loopy, you agree
            to be bound by these terms.
          </p>

          <ul>
            <li>User Account</li>
            <ul>
              <li>Must be 13+ years old</li>
              <li>Provide accurate information</li>
              <li>You are responsible for account activity</li>
            </ul>
            <li>Content Policy</li>
            <ul>
              <li>No hate speech, nudity, or illegal content</li>
              <li>Loopy can remove content that violates fuidelines</li>
            </ul>
            <li>Interllectual Property</li>
            <ul>
              <li>You retain rights to your uploaded content</li>
              <li>
                By uploading, you give us a licence to show it on the platform
              </li>
            </ul>
            <li>Limitions of Liability</li>

            <li>Account Termination</li>
            <ul>
              <li>
                We reserve the right to suspent or delete accounts that violate
                these terms
              </li>
            </ul>

            <li>Modifications</li>
            <ul>
              <li>
                We may change these terms anytime. Continued use implies
                acceptance.
              </li>
            </ul>
            <li>Contact</li>
            <ul>
              <li>
                Questions ? Email <span>legal@loopy.com</span>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Terms;
