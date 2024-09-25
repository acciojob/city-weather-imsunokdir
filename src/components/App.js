import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import { WEATHER_API } from "../weatherApi";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState("");
  const [inputVal, setInputValue] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!search) {
        setWeather(null);
        return;
      }
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${WEATHER_API}`
        );
        if (!response.ok) {
          setWeather(null);
          return;
        }
        const resData = await response.json();
        console.log(resData);
        setWeather(resData);

        // Clear the input value after a valid city is entered
        setInputValue(""); // Only clear the input field
      } catch (err) {
        console.log("Oops... there was an error..!! : ", err);
      }
    };

    const weatherTimeout = setTimeout(() => {
      fetchWeatherData();
    }, 500);

    return () => clearTimeout(weatherTimeout);
  }, [search]); // Only depend on the search term

  return (
    <div id="main">
      <div className="city-input">
        <input
          placeholder="Enter a city"
          onChange={(e) => {
            setSearch(e.target.value);
            setInputValue(e.target.value);
          }}
          className="search"
          value={inputVal}
        />
      </div>
      <div className="weather-details weather">
        {weather && (
          <>
            <h2>{weather.name}</h2>
            <h1>{Math.round(weather.main.temp - 273.15)}° C</h1>
            <h5>{weather.weather[0].description}</h5>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
