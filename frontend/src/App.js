import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import ImageClassifcationPage from "./ImageClassification";
import HomePage from "./Home";
import { CardsClassification } from "./CardsClassification";

export default function AppPage() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/image-classification" element={<ImageClassifcationPage/>}/>
          <Route path="/cards-classification" element={<CardsClassification/>}/>
        </Routes>
      </BrowserRouter>
  );
}
