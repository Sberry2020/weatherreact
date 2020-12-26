import "./App.css";

import React, { useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

export default function App() {
  let [city, setCity] = useState("");
  let [output, setOutput] = useState("");
  let rain = {
    icon: "PARTLY_CLOUDY_DAY",
    color: "#ef4426",
    size: 70,
    animate: true,
  };

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=689e969de90a91f7c9389015a9661d89&units=metric`;
    axios.get(url).then(showTemperature);
  }

  function showTemperature(response) {
    setOutput(
      <ul>
        <li>Temperature: {Math.round(response.data.main.temp)}°C</li>
        <li>Humidity: {response.data.main.humidity}%</li>
        <li>Description: {response.data.weather[0].description}</li>
        <li>Wind: {response.data.wind.speed} km/h</li>
        <img
          src={`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
          alt={response.data.weather[0].description}
        />
      </ul>
    );
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="Search">
      <h1>Weather App</h1>
      <ReactAnimatedWeather
        icon={rain.icon}
        color={rain.color}
        size={rain.size}
        animate={rain.animate}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="Search"
          onChange={updateCity}
          placeholder="Enter a city..."
        />
        <input className="search" type="Submit" readOnly value="Search" />
      </form>
      {output}
    </div>
  );
}
