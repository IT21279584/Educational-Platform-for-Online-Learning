import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import UploadVideo from "./components/UploadVideo";
import AllVideos from "./components/Allvideos";
import Quiz from "./components/Quiz";
import CreateQuiz from "./components/CreateQuiz.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/api/upload-video/:courseId" element={<UploadVideo />} />
        <Route path="/api/videos/:courseId" element={<AllVideos />} />
        <Route path="/api/quiz/:quizId/:courseId" element={<Quiz />} />
        <Route path="/api/quiz/:courseId" element={<CreateQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
