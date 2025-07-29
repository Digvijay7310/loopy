// components/Profile/ProfileHeader.jsx
import { Link } from "react-router-dom";

function ProfileHeader({ profile }) {
  return (
    <>
      <section
        style={{
          backgroundImage: `url('${profile.coverImage || "/avatar2.jpg"}')`,
        }}
        className="mt-[66px] md:mt-[80px] h-[200px] sm:h-[250px] sm:mx-6 rounded-lg bg-center bg-cover relative"
      ></section>

      <section className="flex gap-5 justify-center items-center p-4 sm:mx-6" data-aos="slide-in">
        <img
          className="h-[100px] md:h-[150px] rounded-full ring-1 ring-red-500"
          src={profile.avatar}
          alt={profile.fullName}
        />
        <div className="flex flex-col">
          <h1 className="text-lg">{profile.fullName}</h1>
          <p className="text-sm text-gray-300">@{profile.username}</p>
          <a href={`mailto:${profile.email}`} className="text-sm text-blue-500">
            {profile.email}
          </a>
        </div>

        <Link to="/users/update-profile" className="bg-red-500 py-0.5 px-2.5 rounded-lg text-white">
          Edit
        </Link>
      </section>
    </>
  );
}

export default ProfileHeader;
