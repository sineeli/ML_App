import React, { useState } from "react";
import axios from "axios";
import { Navbar, TaskTile } from "./Utils";

export function CardsClassification() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const token = localStorage.getItem("token");

    try {
      if (!file.type.match(/image\/(jpeg|png)/)) {
        setUploadedImage(null);
        throw new Error("Invalid file format. Please upload a JPEG or PNG image.");
      }

      setIsLoading(true); // Set loading to true

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/image_classification/cards_image/predict",
        formData,
        {
          headers: {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUploadedImage(URL.createObjectURL(file));
      setClassificationResult(response.data.class);
      console.log(response.data);
    } catch (error) {
      console.error("Classification failed", error);
      setClassificationResult("Invalid file format. Please upload a JPEG or PNG image.");
    } finally {
      setIsLoading(false); // Set loading back to false
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Classify poker card</h1>
        <label htmlFor="upload" className="flex flex-col items-center cursor-pointer">
          <div className="border-2 border-dashed rounded-lg p-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-gray-500">Drop an image here or click to browse</span>
          </div>
          <input
            type="file"
            id="upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        <div className="flex mt-8">
          {uploadedImage && (
            <div className="w-80 h-80">
              <img className="w-full h-full object-contain" src={uploadedImage} alt="Uploaded" />
            </div>
          )}
          <div className="ml-8">
            <p className="text-2xl font-bold mb-4">Classification Result</p>
            {isLoading ? (
              <div className="flex items-center justify-center w-32 h-32">
                <div className="animate-spin rounded-full border-t-4 border-gray-400 border-opacity-50 h-16 w-16"></div>
              </div>
            ) : classificationResult ? (
              <div className="bg-gray-200 p-4 rounded-lg">
                <p className="text-gray-800">{classificationResult}</p>
              </div>
            ) : (
              <p className="text-gray-500">No classification result yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
