import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../Pages/Sidebar";

const CreateQuiz = () => {
  const { courseId } = useParams();
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctOptionIndex: 0 },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctOptionIndex: 0 },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/quiz/${courseId}`,
        {
          title: quizTitle,
          questions: questions,
        }
      );
      console.log(response.data); // You can handle success response here
      alert("Quiz created successfully!");
      // Optionally, you can redirect to another page after successful creation
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the quiz.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6">Create Quiz</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="quizTitle"
              className="block text-md font-medium text-gray-700 text-left"
            >
              Quiz Title
            </label>
            <input
              type="text"
              id="quizTitle"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-700 text-left">
              Questions
            </label>
            {questions.map((question, index) => (
              <div
                key={index}
                className="mt-4 border border-gray-300 rounded p-4 relative"
              >
                <button
                  type="button"
                  className="absolute top-0 right-0 mr-2 mt-2 p-1 rounded-full text-gray-500 hover:text-red-500 focus:outline-none"
                  onClick={() => handleRemoveQuestion(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.121 10l-3.56 3.56a1 1 0 1 0 1.414 1.415L9.535 11.42l3.535 3.535a1 1 0 1 0 1.415-1.415L10.536 10l3.535-3.535a1 1 0 1 0-1.415-1.415L9.536 8.58 6 5.045a1 1 0 1 0-1.415 1.414L8.12 10zM18 4a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h14a1 1 0 0 0 1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <label
                  htmlFor={`question${index + 1}`}
                  className="block text-sm font-medium text-gray-700 text-left ml-5"
                >
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  id={`question${index + 1}`}
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
                {question.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                  />
                ))}
                <div className="flex items-center mt-2">
                  <label
                    htmlFor={`correctOption${index}`}
                    className="block mr-2 text-sm font-medium text-gray-700"
                  >
                    Correct Option Index
                  </label>
                  <select
                    id={`correctOption${index}`}
                    value={question.correctOptionIndex}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "correctOptionIndex",
                        parseInt(e.target.value)
                      )
                    }
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    {question.options.map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="mt-4 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 first-line:flex float-end"
            >
              Add Question
            </button>
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
