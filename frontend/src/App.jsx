import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import UploadVideo from "./components/UploadVideo";
import AllVideos from "./components/Allvideos";
import Quiz from "./components/Quiz";
import CreateQuiz from "./components/CreateQuiz.jsx";
import UploadNote from "./components/UploadNote.jsx";
import ProgressIndicator from "./Layouts/ProgressIndicator.jsx";
import HomePage from "./Pages/HomePage.jsx";
import Sidebar from "./Pages/Sidebar.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import NotFound from "./components/NotFound.jsx";
import VideoList from "./components/VideoList.jsx";
import VideoLearner from "./components/VideoLearner.jsx";
import InstructorRegister from "./components/InstructorRegistration.jsx";
import InstructorDashboard from "./components/InstructorDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/api/upload-video/:courseId" element={<UploadVideo />} />
        <Route path="/api/videos/:courseId" element={<AllVideos />} />
        <Route path="/api/quiz/:quizId/:courseId" element={<Quiz />} />
        <Route path="/api/quiz/:courseId" element={<CreateQuiz />} />
        <Route path="/api/note/:courseId" element={<UploadNote />} />
        <Route path="/api/progress" element={<ProgressIndicator />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/side" element={<Sidebar />} />
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/register" element={<Register />} />
        <Route
          path="/api/instructor/register"
          element={<InstructorRegister />}
        />
        <Route
          path="/api/instructor/dashboard"
          element={<InstructorDashboard />}
        />
        <Route path="/api/video/all" element={<VideoList />} />
        <Route path="/api/video-learner/:videoId" element={<VideoLearner />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
