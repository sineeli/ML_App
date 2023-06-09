import React, { useState} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navbar } from "./Utils";

export function NumberPlateDetection() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState("");
  const [classificationProbability, setClassificationProbability] = useState("");
  const [cookies] = useCookies(["authToken"]);

  const handleImageUpload = async (event) => {

    const file = event.target.files[0];

    try {
      if (!file.type.match(/image\/(jpeg|png)/)) {
        setUploadedImage(null);
        setClassificationResult(null);
        setClassificationProbability(null);
        alert("Invalid file format. Please upload a JPEG or PNG image.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/image_classification/cards_image/predict",
        formData,
        {
          headers: {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies._auth}`,
          },
        }
      );

      setUploadedImage(URL.createObjectURL(file));
      setClassificationResult(response.data.class);
      setClassificationProbability(response.data.prob);
      console.log(response.data);
    } catch (error) {
      console.error("Classification failed", error);
      setClassificationResult("");
      setClassificationProbability("");
      alert("Classification failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Car Number Plate Detection</h1>
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
            <p className="text-2xl font-bold mb-4">Object Detection Result</p>
            {classificationResult ? (
              <div className="bg-gray-200 p-4 rounded-lg">
                <p className="text-gray-800"><i><strong>Class:</strong></i> {classificationResult}</p>
                <p className="text-gray-600"><i><strong>Probability:</strong></i>  {classificationProbability}</p>
              </div>
            ) : (
              <p className="text-gray-500">No detection result yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
