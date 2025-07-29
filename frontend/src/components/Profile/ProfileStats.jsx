function ProfileStats({ views, createdAt }) {
  return (
    <section className="flex justify-center items-center gap-5 mx-2">
      <div className="bg-gray-800 flex flex-col items-center rounded-xl p-2">
        <h2 className="text-sm sm:text-md">Profile Views</h2>
        <p className="text-gray-300 text-sm">{views.toLocaleString()}</p>
      </div>
      <div className="bg-gray-800 flex flex-col items-center rounded-xl p-2">
        <h2 className="text-sm sm:text-md">Date Of Join</h2>
        <p className="text-gray-300 text-sm">
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </section>
  );
}

export default ProfileStats;
