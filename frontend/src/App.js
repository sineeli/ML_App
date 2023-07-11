import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import ImageClassifcationPage from "./ImageClassification";
import HomePage from "./Home";
import { CardsClassification } from "./CardsClassification";
import { RequireAuth } from "react-auth-kit";
import ObjectDetectionPage from "./ObjectDetection";

export default function AppPage() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<RequireAuth loginPath="/login"><HomePage /></RequireAuth>} />
        <Route path="/image-classification/">
          <Route index element={<RequireAuth loginPath="/login"><ImageClassifcationPage /></RequireAuth>}/>
          <Route path="cards-classification" element={<RequireAuth loginPath="/login"><CardsClassification /></RequireAuth>}/>
        </Route>
        <Route path="/object-detection" element={<RequireAuth><ObjectDetectionPage/></RequireAuth>}>
        </Route>
      </Routes>
    </Router>
  );
}
