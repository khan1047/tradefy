import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-4 px-6 py-3 bg-white border-b shadow-sm">
      {/* Logo */}
      <Link to="/dashboard" className="text-2xl font-bold text-teal-600">
        TradeFy
      </Link>

      {/* Location */}
      <input
        type="text"
        placeholder="Location"
        className="border px-3 py-2 rounded-md text-sm w-40 focus:outline-none"
      />

      {/* Search */}
      <input
        type="text"
        placeholder="Search for products, jobs, cars..."
        className="flex-1 border px-4 py-2 rounded-md text-sm focus:outline-none"
      />

      {/* Right actions */}
      {user && (
        <>
          <Link
            to="/post-ad"
            className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700"
          >
            + Post Ad
          </Link>

          <button
            onClick={handleLogout}
            className="text-sm text-red-600 border border-red-600 px-3 py-2 rounded-md hover:bg-red-50"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
