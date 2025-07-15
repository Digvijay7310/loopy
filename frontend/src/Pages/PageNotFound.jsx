import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-9xl font-extrabold text-red-600 mb-6 select-none">404</h1>
      <p className="text-2xl sm:text-3xl font-semibold mb-4">Page Not Found</p>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/users"
        className="bg-red-600 hover:bg-red-700 transition-colors duration-300 px-6 py-3 rounded font-semibold"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
