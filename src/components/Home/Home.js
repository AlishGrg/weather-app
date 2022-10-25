import React, { useState } from 'react'
import axios from 'axios'
import './Home.css'

const Home = () => {
  const [cityName, setCityName] = useState('')
  const [weatherData, setWeatherData] = useState({
    temp_min: 0,
    temp_max: 0,
    temp: 0,
    feels_like: 0,
    humidity: 0,
    city: 'City',
    country: 'Country',
    sunrise: 0,
    sunset: 0,
    description: '',
  })
  const searchWeather = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=5896e57fcfb376a6f374a0f1a207a527`
    axios.get(url)
      .then(
        (res) => {
          console.log(res.data)
          setWeatherData({
            temp_min: res.data.main.temp_min,
            temp_max: res.data.main.temp_max,
            temp: res.data.main.temp,
            feels_like: res.data.main.feels_like,
            humidity: res.data.main.humidity,
            city: res.data.name,
            country: res.data.sys.country,
            sunrise: res.data.sys.sunrise,
            sunset: res.data.sys.sunset,
            description: res.data.weather[0].description,
          })
        }
      )

  }
  return (
    <div className='container'>
      <div className='details'>
        <div className='search'>
          <input type='text' className='search-bar' name='city' placeholder='Search for a city...' onChange={(event) => {
            setCityName(event.target.value)
          }}
          />
          <button type='submit' className='search-btn' onClick={searchWeather}>
            <i className='fa fa-search' aria-hidden='true'></i>&nbsp;
            <span>Search</span>
          </button>
        </div>
        <div className='city'><i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;
          <span>{weatherData.city}, </span>
          <span>{weatherData.country}</span>
        </div>
        <div className='current-temp'>
          <span>{weatherData.temp} &#8451;</span>
        </div>
        <div className='description'><span>{weatherData.description}</span></div>
        <div className='feels-like'><span>Feels Like: {weatherData.feels_like} &#8451;</span></div>
        <div className='weather-details'>
          <div className='temp-min'>
            <span>{weatherData.temp_min} &#8451;</span><br />
            <span>Min Temp</span>
          </div>
          <div className='temp-max'><span>{weatherData.temp_max} &#8451;</span><br />
            <span>Max Temp</span>
          </div>
          <div className='humidity'><span>{weatherData.humidity} &#37;</span><br />
            <span>Humidity</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home