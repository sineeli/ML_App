import React from "react";
import { FaUser } from "react-icons/fa";

function TaskTile({ taskname, image }) {
  return (
    <div className="relative w-48 h-48 mr-6">
      <div className="absolute inset-0 border border-gray-300 overflow-hidden rounded-lg shadow-md bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <img
          className="w-full h-full object-cover transition-opacity duration-300 opacity-100 hover:opacity-75"
          src={image}
          alt="image-classification"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
          <h1 className="text-white text-sm">{taskname}</h1>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="flex items-center p-4 mb-2 bg-slate-300">
      <img
        className="w-10 h-10 bg-opacity-100 mix-blend-multiply mr-2"
        src="./navicon.png"
        alt="navicon"
      />
      <h1 className="flex-grow text-xl font-bold">ML App</h1>
      <div className="flex items-center">
        <FaUser className="mr-2" size={30} style={{ borderRadius: "50%" }} />
      </div>
    </nav>
  );
}

export default function MainPage() {
  return (
    <div>
      <Navbar />
      <div className="ml-4 mr-4">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Tasks</h1>
        <div className="flex flex-wrap">
          <TaskTile
            taskname="Image Classification"
            image={"./image_classification.jpg"}
          />
          <TaskTile
            taskname="Object Detection"
            image={"./object_detection.webp"}
          />
          <TaskTile taskname="Time Series" image={"./time_series.webp"} />
        </div>
      </div>
    </div>
  );
}
