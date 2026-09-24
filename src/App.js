import "./App.scss";
import { useEffect, useState } from "react";

function formattedDate(dateStr) {
  const date = new Date(dateStr.replace(" ", "T"));
  const formatted = date.toLocaleDateString("pl-PL");

  return formatted;
}

function FetchWeather({ latitude, longitude }) {
  const [appData, setAppData] = useState(null);

  const APP_KEY = "58bb577649a548fcbda33355261809";

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${latitude},${longitude}&days=2&lang=pl`,
    )
      .then((res) => res.json())
      .then((json) => setAppData(json))
      .catch((err) => console.error(err));
  }, [latitude, longitude]);

  if (!appData) {
    return <div className="container">Ładowanie...</div>;
  }

  return (
    <div className="weather-app-b">
      <h1 className="weather-app-b__city">{appData.location.name}</h1>
      <div className="weather-app-b__today">
        <div className="weather-app-b__date">
          <h2 className="weather-app-b__today-title">Dziś</h2>
          <span>{formattedDate(appData.current.last_updated)}</span>
        </div>
        <h2 className="weather-app-b__temp">{appData.current.temp_c}&deg;C</h2>
        <h3 className="weather-app-b__condition">
          <img
            src={appData.current.condition.icon}
            alt={appData.current.condition.text}
          />
          {appData.current.condition.text}
          {console.log(appData)}
        </h3>
      </div>
    </div>
  );
}

function App() {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Błąd geolokalizacji:", error.message);
      },
    );
  }, []);

  if (!coords) {
    return <div className="container">Pobieranie lokalizacji...</div>;
  }

  return (
    <div className="container">
      <FetchWeather latitude={coords.latitude} longitude={coords.longitude} />
    </div>
  );
}

export default App;
