// ProgressIndicator.js


const ProgressIndicator = () => {
  // Dummy progress data, you can replace it with dynamic data if needed
  const steps = ["Add Course", "Add Videos", "Add Notes", "Add Quiz"];
  const currentStep = 1; // Assuming current step is 1-based index

  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex items-center ${
            index < currentStep ? "text-pink-600" : "text-gray-300"
          }`}
        >
          <div className="rounded-full bg-white border-2 border-pink-600 flex items-center justify-center w-8 h-8">
            {index < currentStep ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-pink-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm9-7a7 7 0 00-6.707 9H8v2h1v2h2v-2h1v-2h1V9h.707A7 7 0 0011 3z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          <span className="ml-2">{step}</span>
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
