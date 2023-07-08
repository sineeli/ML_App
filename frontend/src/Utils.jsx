import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

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
  return (
    <nav className="flex items-center p-4 mb-2 bg-slate-300">
      <Link className="flex-grow text-xl font-bold" to="/Home">
        <h1>Home</h1>
      </Link>

      <div className="flex items-center justify-end">
        <FaUser className="mr-2" size={30} style={{ borderRadius: "50%" }} />
      </div>
    </nav>
  );
}
