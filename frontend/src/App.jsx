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
import CourseList from "./components/CourseList.jsx";
import VideoCourseList from "./components/VideoCourseList.jsx";
import NoteCourseList from "./components/NoteCourseList.jsx";
import QuizCourseList from "./components/QuizCourseList.jsx";
import CreateCourse from "./components/CreateCourse.jsx";
import UserDetails from "./components/UserDetails.jsx";
import InstructorAllVideos from "./components/InstructorAllVideos.jsx";
import EditCourse from "./components/EditCourse.jsx";
import AdminCourseList from "./components/AdminCourseList.jsx";
import Home from "./Pages/Home.jsx";
import Books from "./components/Book-section/Books.jsx";
import Course from "./Pages/Course.jsx";
import SharePage from "./Pages/SharePage.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/api/upload-video/:courseId" element={<UploadVideo />} />
        <Route path="/api/videos/:courseId" element={<AllVideos />} />
        <Route
          path="/api/instructor/videos/:courseId"
          element={<InstructorAllVideos />}
        />
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
        <Route path="/api/course/all" element={<CourseList />} />
        <Route path="/api/course/video/all" element={<VideoCourseList />} />
        <Route path="/api/course/note/all" element={<NoteCourseList />} />
        <Route path="/api/course/quiz/all" element={<QuizCourseList />} />
        <Route path="/api/course/add" element={<CreateCourse />} />
        <Route path="/api/course/edit/:courseId" element={<EditCourse />} />

        <Route path="/api/video-learner/:videoId" element={<VideoLearner />} />

        <Route path="/api/user" element={<UserDetails />} />
        <Route path="/api/admin/courses" element={<AdminCourseList />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/library" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/course/:courseId" element={<Course />} />
        <Route path="/share/:userName" element={<SharePage />} />
      </Routes>
    </Router>
  );
}

export default App;
