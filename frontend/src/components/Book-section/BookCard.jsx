import React from "react";

const BookCard = (props) => {
  const { image, bookName, description, author, book } = props.item;

  // Create a data URL for the PDF file
  const pdfDataUrl = `data:application/pdf;base64,${book}`;

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 my-3">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Book Image */}
        <img
          src={`data:image/jpeg;base64,${image}`}
          className="w-full h-60 object-cover"
          alt="Book Cover"
        />

        {/* Book Details */}
        <div className="p-4">
          <h6 className="text-lg font-semibold mb-2">{bookName}</h6>
          <p className="text-gray-700 mb-2">By: {author}</p>
          <p className="text-gray-600 mb-4">{description}</p>
          <hr className="my-2"/>

          {/* Download Button */}
          <a href={pdfDataUrl} download={`${bookName}.pdf`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              Download
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
