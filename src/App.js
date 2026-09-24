import "./App.scss";
import { useEffect, useState } from "react";

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
      <h1>{appData.location.name}</h1>
      <h2 className="weather-app-b__condition">
        <img
          src={appData.current.condition.icon}
          alt={appData.current.condition.text}
        />
        {appData.current.condition.text}
      </h2>
      <h2>{console.log(appData.current.condition.text)}</h2>
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
