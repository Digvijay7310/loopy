import React from "react";
import { FaBook } from "react-icons/fa";

function Faq() {
  return (
    <main className="bg-zinc-900 min-h-screen text-white p-6">
      <h2 className="text-3xl font-bold mb-6 flex gap-2">
        <FaBook /> Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold text-xl">1. What is Loopy?</h2>
          <p>
            Loopy is a short-video sharing platform where uesrs can upload,
            watch, like, and comment on vdeos. Iy is designed for creators and
            viewers who enjoy short-form engaging content/
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-xl">
            2. How can I upload a video?
          </h2>
          <p>
            Sign in, go to the upload section, and select your video file (under
            60 seconds). Add a title and choose whether. It is public or
            private.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-xl">
            3. Can I like or comment on videos?
          </h2>
          <p>
            Yes, you can like and comment on public videos. Comments are visible
            to all, but likes can be made private.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-xl">4. Who can see my profile?</h2>
          <p>
            Your profile is visible to other users unless marked as private. You
            can control what information is shown.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-xl">
            5. What types of content are allowed?
          </h2>
          <p>
            Loopy promotes creative and respectful content. Videos that contain
            hate speech, nudity, violence, or spam are strictly prohibited and
            may lead to a ban.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-xl">
            6. How do I report a video aor user?
          </h2>
          <p>
            Click on the "Report" button available on every video and user
            profile. Our moderation team will review it.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-xl">7. Is Loopy free to use?</h2>
          <p>
            Yes, Loopy is completely free to ues for watching and uploading
            videos.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-xl">8. Can I delete my account?</h2>
          <p>
            Yes, you can delete your account from your settings page. This will
            permanently remove all your data.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Faq;
