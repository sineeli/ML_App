import React from "react";
import { Link } from "react-router-dom";
import { TaskTile, Navbar } from "./Utils";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="ml-4 mr-4">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Tasks</h1>
        <div className="flex flex-wrap">
          <Link to="/image-classification">
            <TaskTile
              taskname="Image Classification"
              src="./image_classification.jpg"
            />
          </Link>
          <Link to="/object-detection">
            <TaskTile
              taskname="Object Detection"
              src="./object_detection.webp"
            />
          </Link>

          <TaskTile taskname="Time Series" src={"./time_series.webp"} />
        </div>
      </div>
    </div>
  );
}
