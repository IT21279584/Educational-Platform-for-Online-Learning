import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const { courseId, quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [congratulations, setCongratulations] = useState(false);
  const [answerStatus, setAnswerStatus] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/quiz/${quizId}/courses/${courseId}/questions`
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to fetch questions.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (questionId, selectedOptionIndex) => {
    setAnswers({ ...answers, [questionId]: selectedOptionIndex });
  };

  const handleSubmit = () => {
    let correct = 0;
    const answerStatusCopy = {};
    questions.forEach((question) => {
      if (question.correctOptionIndex === answers[question.questionId]) {
        correct++;
        answerStatusCopy[question.questionId] = "correct";
      } else {
        answerStatusCopy[question.questionId] = "incorrect";
      }
    });
    setCorrectCount(correct);
    setShowResult(true);
    setCheckboxChecked(false);
    setAnswerStatus(answerStatusCopy);

    if (correct / questions.length >= 0.75) {
      setCongratulations(true);
    } else {
      setCongratulations(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  let questionNumber = 1; // Initialize question number

  return (
    <div className="max-w-3xl mx-auto p-4">
      {showResult && !congratulations && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <strong className="font-bold">Oops!</strong>{" "}
            <span className="block sm:inline">
              You did not achieve a score of 75% or higher.
            </span>
          </div>
        </div>
      )}
      {congratulations && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <strong className="font-bold">Congratulations!</strong>{" "}
            <span className="block sm:inline">
              You have achieved a score of 75% or higher.
            </span>
          </div>
        </div>
      )}
      <h2 className="text-3xl font-semibold mb-8">Quiz</h2>
      <div className="space-y-8">
        {questions.map((question) => (
          <div
            key={question.questionId}
            className="mb-8 border border-gray-200 rounded p-4"
          >
            <h3 className="mb-4 text-left">
              <span className="font-semibold mr-3">{questionNumber++}.</span>
              {question.question}
              <span className="float-right bg-slate-300 px-2 py-1 rounded-md text-sm font-bold">
                1 Point
              </span>
            </h3>
            <ul className="text-left ">
              {question.options.map((option, index) => (
                <li
                  key={index}
                  className={`mb-2 ${
                    answers[question.questionId] === index
                      ? answerStatus[question.questionId] === "correct"
                        ? "bg-green-100"
                        : "bg-red-100"
                      : ""
                  }`}
                >
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`question_${question.questionId}`}
                      value={index}
                      onChange={() =>
                        handleOptionSelect(question.questionId, index)
                      }
                      className="form-radio h-4 w-4 text-blue-600 ml-6"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
            {showResult && (
              <div className="mt-2">
                {answerStatus[question.questionId] === "correct" && (
                  <div className="text-green-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline-block mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    That's correct
                  </div>
                )}
                {answerStatus[question.questionId] === "incorrect" && (
                  <div className="text-red-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline-block mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    That's incorrect
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={checkboxChecked}
            onChange={() => setCheckboxChecked(!checkboxChecked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-left m-6">
            I understand that submitting work that isn’t my own may result in
            permanent failure of this course.
          </span>
        </label>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!checkboxChecked}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          !checkboxChecked ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export default Quiz;
 