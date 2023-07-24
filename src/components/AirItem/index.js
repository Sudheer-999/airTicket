import "./index.css";

const AirItem = (props) => {
  const { airDetails, bookDate } = props;
  const {
    flightName,
    flightCode,
    startingTime,
    startingPlace,
    journeyDuration,
    reachingTime,
    reachingPlace,
    price,
  } = airDetails;

  return (
    <li className="list-item">
      <div className="company-section">
        <img
          src="https://res.cloudinary.com/djzsbpran/image/upload/v1690164177/AIRPLANE_026-removebg-preview_j9vsra.png"
          alt="flight"
          className="flight-image"
        />
        <p className="flight-name">{flightName}</p>
        <p className="flight-code">{flightCode}</p>
      </div>

      <div className="start-place-section">
        <p className="start-place">{startingPlace}</p>
        <p className="time">{startingTime}</p>
        <p className="book-date">{bookDate}</p>
      </div>

      <div className="start-place-section">
        <p className="end-place">{reachingPlace}</p>
        <p className="time">{reachingTime}</p>
        <p className="book-date">{bookDate}</p>
      </div>

      <div className="start-place-section">
        <p className="duration">{journeyDuration}</p>
      </div>

      <div className="start-place-section">
        <p className="price">{price}</p>
      </div>

      <button type="button" className="book-button">
        Book
      </button>
    </li>
  );
};

export default AirItem;
