import { Link } from "react-router-dom";

function ProfileNavTabs() {
  const categories = ["All", "Uploaded", "Likes", "Comments", "Subscribed", "Watchlist"];

  return (
    <nav className="flex justify-center items-center gap-6 p-2 mt-4 overflow-x-auto">
      {categories.map((cat) => (
        <Link
          key={cat}
          to="#"
          className="text-sm bg-slate-900 px-3 py-1 rounded-lg hover:bg-slate-700 duration-300"
        >
          {cat}
        </Link>
      ))}
    </nav>
  );
}

export default ProfileNavTabs;
