document.getElementById('search-btn').addEventListener('click', getWeather);    
    async function getWeather() {
      const city = document.getElementById('city-input').value.trim();
      const apiKey = 'bc32cd52e7cf06451eb7349d43698d25'; 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const loader = document.getElementById('loading-spinner');
      const weatherCard = document.querySelector('.weather-card');
      if (!city) {
        alert('Please enter a city name!');
        return;
      }
      try {
        loader.style.display = 'block';  
        weatherCard.style.display = 'none';
        setTimeout(async () => {
          const response = await fetch(url);
          const data = await response.json();
          loader.style.display = 'none'; 
          if (data.cod === 200) {
            weatherCard.style.display = 'block'; 
            document.getElementById('city-name').textContent = data.name;
            document.getElementById('temp').textContent =` ${data.main.temp}°C`;
            document.getElementById('description').textContent = data.weather[0].description;
          } else {
            alert('City not found! Please try again.');
          }
        }, 1000); 
      } catch (error) {
        loader.style.display = 'none'; 
        alert('Unable to fetch weather data. Please try again later.');
      }
    }