import axios from "axios";

import { API_KEY } from "../constants/constant";

const forecastEndPoint =  (params) => {
  console.log(params);
  return `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.city.name}&days=${params.days}&aqi=no&alerts=no`;
};

const locationsEndPoint = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.city}`;

const fetchWeather = async (endpoint) => {
  const options = {
    method: "GET",
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const fetchWeatherForecast = (params) => {
  console.log("params",params);
  return fetchWeather(forecastEndPoint(params));
};

export const fetchLocations = (params) => {
  return fetchWeather(locationsEndPoint(params));
};
