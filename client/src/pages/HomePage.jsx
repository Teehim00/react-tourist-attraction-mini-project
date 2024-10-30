import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

function HomePage() {
  const [trips, setTrips] = useState([]);
  const [searchs, setSearchs] = useState("");

  /* console.log(trips); */
  const getSearchs = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4001/trips?keywords=${searchs}`
      );
      /* console.log(results) */
      setTrips(results.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSearchs();
  }, [searchs]);

  return (
    <div className="min-h-screen p-4 w-full px-20 mt-10">
      <Navbar />

      <div className="w-full flex justify-center">
        <input
          id="search"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          value={searchs}
          onChange={(event) => setSearchs(event.target.value)}
          className="rounded-none border-b-2 border-gray-300 p-2 w-[900px] bg-white text-center focus:outline-none focus:ring-0 focus:border-blue-500 text-xl mx-auto"
        />
      </div>
      <div className="mt-10">
        {trips.map((trip) => {
          return (
            <div className="product flex items-start mb-4" key={trip.eid}>
              <div className="ppreview w-1/4">
                <img
                  src={trip.photos[0]}
                  alt="Product preview"
                  className="w-full h-[250px] rounded-3xl"
                  onClick={() => window.open(trip.url, "_blank")}
                />
              </div>
              <div className="product-detail w-f ml-8">
                <h1 className="text-lg font-bold">{trip.name}</h1>
                <h2
                  className="text-2xl font-bold mb-3"
                  onClick={() => window.open(trip.url, "_blank")}
                >
                  {trip.title}
                </h2>
                <p>
                  {trip.description.length > 100
                    ? `${trip.description.slice(0, 100)}... `
                    : trip.description}
                  {trip.description.length > 100 && (
                    <span
                      className="text-blue-500 underline cursor-pointer"
                      onClick={() => window.open(trip.url, "_blank")}
                    >
                      อ่านต่อ
                    </span>
                  )}
                </p>
                <p>
                  หมวด:<span className="mr-2"></span>
                  {trip.tags.map((tag, index) => (
                    <span key={index} className="mr-2">
                      {tag}
                    </span>
                  ))}
                </p>
                <div className="photos flex flex-wrap ">
                  {trip.photos.slice(1).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-[120px] h-[100px] mr-[30px] rounded-xl mt-8"
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
