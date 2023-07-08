import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useSignOut } from "react-auth-kit";

export function TaskTile({ taskname, src }) {
  return (
    <div className="relative w-48 h-48 mr-4 mb-4">
      <div className="absolute inset-0 border border-gray-300 overflow-hidden rounded-lg shadow-md bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <img
          className="w-full h-full object-cover transition-opacity duration-300 opacity-100 hover:opacity-75"
          src={src}
          alt={taskname}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
          <h1 className="text-white text-sm">{taskname}</h1>
        </div>
      </div>
    </div>
  );
}


export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <nav className="flex items-center p-4 mb-2 bg-slate-300">
      <Link className="flex-grow text-xl font-bold" to="/">
        <h1>Home</h1>
      </Link>

      <div className="relative">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleToggleDropdown}
        >
          <FaUser className="mr-2" size={30} style={{ borderRadius: "50%" }} />
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-300 rounded shadow">
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

