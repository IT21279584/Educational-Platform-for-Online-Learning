import React from "react";

const CourseCard = (props) => {
  const { image, courseName, profilePicture, tutorName, courseDuration, yourPreferences, minimumAnnualSalary, jobsAvailable, id } = props.item;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4">
        {/* Course Image */}
        <div className="course-img">
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt={courseName}
            className="w-full h-40 object-cover"
          />
        </div>

        {/* Course Details */}
        <div className="mt-4">
          {/* Course Title */}
          <h6 className="text-lg font-semibold mb-2">{courseName}</h6>

          {/* Tutor Details */}
          <div className="flex items-center mb-2">
            <img
              src={`data:image/jpeg;base64,${profilePicture}`}
              alt="Profile"
              className="rounded-full w-10 h-10 object-cover"
            />
            <span className="ml-2">{tutorName}</span>
            {/* Rating */}
            <p className="ml-auto flex items-center gap-1">
              <i className="ri-star-fill"></i> 100K
            </p>
          </div>

          {/* Course Info */}
          <div className="mb-2">
            <p className="mb-1"><strong>Duration:</strong> {courseDuration}</p>
            <p className="mb-1"><strong>Great if you like:</strong> {yourPreferences}</p>
            <hr className="my-2" />
            <p><strong>{minimumAnnualSalary}</strong> Minimum Salary, <strong>{jobsAvailable}</strong> Jobs Available</p>
          </div>

          {/* Enroll Button */}
          <div className="text-right">
            <p className="enroll">
              <a href={`course/${id}`} className="text-blue-500 font-semibold hover:underline">Start Now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
