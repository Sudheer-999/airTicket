import "./index.css";
import AirItem from "../AirItem";
import { useState } from "react";
import Select from "react-select";
import { ColorRing } from "react-loader-spinner";

const airports = [
  {
    airportName: "Visakhapatnam International Airport",
    airportPlace: "Visakhapatnam, Andhra Pradesh",
    airportCode: "VTZ",
  },
  {
    airportName: "Vijayawada International Airport",
    airportPlace: "Vijayawada, Andhra Pradesh",
    airportCode: "VGA",
  },
  {
    airportName: "Rajiv Gandhi International Airport",
    airportPlace: "Hyderabad, Telangana",
    airportCode: "HYD",
  },
  {
    airportName: "Tirupati Airport",
    airportPlace: "Tirupati, Andhra Pradesh",
    airportCode: "TIR",
  },
  {
    airportName: "Rajahmundry Airport",
    airportPlace: "Rajahmundry, Andhra Pradesh",
    airportCode: "RJA",
  },
  {
    airportName: "Kadapa Airport",
    airportPlace: "Kadapa, Andhra Pradesh",
    airportCode: "CDP",
  },
  {
    airportName: "Warangal Airport",
    airportPlace: "Warangal, Telangana",
    airportCode: "WGC",
  },
  {
    airportName: "Rajiv Gandhi International Airport",
    airportPlace: "Shamshabad, Telangana",
    airportCode: "HYD",
  },
  {
    airportName: "Vijayanagar Airport",
    airportPlace: "Bellary, Andhra Pradesh",
    airportCode: "VDY",
  },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxShadow: "none",
    backgroundColor: "#f5f6f7",
  }),
};

const AirTick = () => {
  const [startPlace, setStartPlace] = useState("");

  const [endPlace, setEndPlace] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const [airData, setAirData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (option) => {
    setStartPlace(option);
  };

  const handleEndplace = (option) => {
    setEndPlace(option);
  };

  const options = airports.map((airport) => ({
    value: airport.airportPlace,
    label: `${airport.airportName} (${airport.airportPlace}) - ${airport.airportCode}`,
  }));

  const onSearch = () => {
    getAirplanesData();
  };

  const getAirplanesData = async () => {
    setIsLoading(true);
    const url = "https://64bcc2ab7b33a35a44474f0a.mockapi.io/airdata";

    const request = await fetch(url);

    const data = await request.json();

    const filteredData = data.filter(
      (plane) =>
        plane.startingPlace === startPlace.value &&
        plane.reachingPlace === endPlace.value
    );

    setAirData(filteredData);
    setIsLoading(false);
  };

  console.log(airData);
  console.log(selectedDate);

  const errorMsg = airData.length === 0 && "No Data Found";
  const resultText =
    airData.length !== 0 &&
    `Flights from ${startPlace.value} to ${endPlace.value} on ${selectedDate}`;

  return (
    <div className="bg-container">
      <h1 className="main-head">AirTick</h1>
      <p className="caption">-Book your tickets effortlessly</p>
      <div className="select-section">
        <div className="select-sub">
          <div className="select-item">
            <label className="select-label">From: </label>
            <Select
              styles={customStyles}
              value={startPlace}
              onChange={handleChange}
              options={options}
              isSearchable
              placeholder="Select City..."
              className="dropdown"
            />
          </div>

          <div className="select-item">
            <label className="select-label">To: </label>
            <Select
              styles={customStyles}
              value={endPlace}
              onChange={handleEndplace}
              options={options}
              isSearchable
              placeholder="Select City..."
              className="dropdown"
            />
          </div>

          <div className="date-field select-item">
            <label className="select-label">Date of Journey: </label>
            <input
              type="date"
              className="date-picker"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
        <div className="button-con">
          <button onClick={onSearch} type="button" className="search-button">
            Search
          </button>
        </div>
      </div>

      {isLoading && (
        <ColorRing
          visible={true}
          height="380"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#041454"]}
        />
      )}

      {isLoading === false && (
        <ul className="listed-container">
          <p className="result-text">{resultText}</p>
          {airData.map((eachItem) => (
            <AirItem
              airDetails={eachItem}
              bookDate={selectedDate}
              key={eachItem.flightCode}
            />
          ))}
          <p className="error-msg">{errorMsg}</p>
        </ul>
      )}
    </div>
  );
};

export default AirTick;
