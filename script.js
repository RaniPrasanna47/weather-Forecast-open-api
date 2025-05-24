document.getElementById('search-btn').addEventListener('click', getWeather);

    function getAQILevel(index) {
      const levels = {
        1: "Good 😊",
        2: "Fair 🙂",
        3: "Moderate 😐",
        4: "Poor 😷",
        5: "Very Poor 🤢"
      };
      return levels[index] || "Unknown";
    }

    async function getWeather() {
      const city = document.getElementById('city-input').value.trim();
      const apiKey = 'bc32cd52e7cf06451eb7349d43698d25';
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      const loader = document.getElementById('loading-spinner');
      const card = document.querySelector('.weather-card');

      if (!city) {
        alert('Please enter a city name!');
        return;
      }

      try {
        loader.style.display = 'block';
        card.style.display = 'none';

        const response = await fetch(weatherUrl);
        const data = await response.json();

        if (data.cod === 200) {
          const { name, main, weather, wind, coord } = data;
          const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

          // Update UI
          document.getElementById('city-name').textContent = name;
          document.getElementById('temp').textContent = `🌡️ ${main.temp}°C`;
          document.getElementById('humidity').textContent = `💧 Humidity: ${main.humidity}%`;
          document.getElementById('wind').textContent = `💨 Wind: ${wind.speed} km/h`;
          document.getElementById('description').textContent = `📖 ${weather[0].description}`;
          document.getElementById('icon').src = iconUrl;

          // Fetch AQI
          const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`;
          const aqiRes = await fetch(aqiUrl);
          const aqiData = await aqiRes.json();
          const aqiIndex = aqiData.list[0].main.aqi;
          document.getElementById('aqi').textContent = `🌫️ AQI: ${getAQILevel(aqiIndex)}`;

          loader.style.display = 'none';
          card.style.display = 'block';
        } else {
          loader.style.display = 'none';
          alert('City not found!');
        }
      } catch (error) {
        loader.style.display = 'none';
        alert('Error fetching data.');
      }
    }