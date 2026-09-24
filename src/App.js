import "./App.scss";
import { useEffect, useState } from "react";

function formattedDate(dateStr) {
  const date = new Date(dateStr.replace(" ", "T"));
  const formatted = date.toLocaleDateString("pl-PL");

  return formatted;
}

function Box({
  todayTitle,
  date,
  temp,
  conditionIcon,
  conditionText,
  chanceOfRain,
  chanceOfSnow,
  cloud,
}) {
  return (
    <div className="weather-app-b__today">
      <div className="weather-app-b__date">
        <h2 className="weather-app-b__today-title">{todayTitle}</h2>
        <span>{date}</span>
      </div>
      <h2 className="weather-app-b__temp">{temp}&deg;C</h2>
      <h3 className="weather-app-b__condition">
        <img src={conditionIcon} alt={conditionText} />
        {conditionText}
      </h3>
      <div className="weather-app-b__chances">
        <div>Szanse na deszcz: {chanceOfRain}%</div>
        <div>Szanse na śnieg: {chanceOfSnow}%</div>
        <div>Pochmurno: {cloud}%</div>
      </div>
    </div>
  );
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
      <Box
        todayTitle="Dziś"
        date={formattedDate(appData.current.last_updated)}
        temp={appData.current.temp_c}
        conditionIcon={appData.current.condition.icon}
        conditionText={appData.current.condition.text}
        chanceOfRain={appData.current.chance_of_rain}
        chanceOfSnow={appData.current.chance_of_snow}
        cloud={appData.current.cloud}
      />
      {console.log(appData)}
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
