

const BookCard = (props) => {
  const { image, bookName, description, author, book } = props.item;

  // Create a data URL for the PDF file
  const pdfDataUrl = `data:application/pdf;base64,${book}`;

  return (
    <div className="my-3 text-center shadow col-lg-2 col-md-3">
      <div className="shadow card" style={{ width: "14rem" }}>
        <img
          src={`data:image/jpeg;base64,${image}`}
          className="card-img-top"
          alt="..."
          style={{ height: "300px" }}
          />                     
        <div className="card-body">
        <div className="d-flex align-items-center">
          <h6 className="card-title me-2">{bookName}</h6>  {/* Add margin-end for space */}
          <h6 className="rating d-flex align-items-center ms-auto">
              <i className="ri-star-fill me-1"></i> {100}K
          </h6>
        </div>     
          <p className="mb-1 card-text">By: {author}</p>
          <hr className="my-1" />         
          <p className="mb-1 card-text">{description}</p>
          <a href={pdfDataUrl} download={`${bookName}.pdf`}>
              <button className="mx-2 mb-2 btn btn-primary">Download</button>
          </a>
        </div>

      </div>
    </div>
  );
};

export default BookCard;
