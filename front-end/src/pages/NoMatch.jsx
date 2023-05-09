import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">404 Page Not Found</h1>
      <p className="text-lg mb-12">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default NoMatch;
