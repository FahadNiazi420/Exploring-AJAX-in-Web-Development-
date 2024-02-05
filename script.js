document.addEventListener('DOMContentLoaded', function () {
    const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');

    fetchWeatherBtn.addEventListener('click', function () {
        const city = cityInput.value.trim();
        if (city !== '') {
            const apiKey = 'aefbb4df12ea493cc9892bb76d3b42ab';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            // Create new XMLHttpRequest object
            const xhr = new XMLHttpRequest();

            // Configure the request
            xhr.open('GET', apiUrl, true);

            // Setup onload function
            xhr.onload = function () {
                if (this.status === 200) {
                    const response = JSON.parse(this.responseText);
                    const weatherDescription = response.weather[0].description;
                    const temperature = response.main.temp;
                    const humidity = response.main.humidity;
                    const windSpeed = response.wind.speed;
                    const sunrise = new Date(response.sys.sunrise * 1000).toLocaleTimeString();
                    const sunset = new Date(response.sys.sunset * 1000).toLocaleTimeString();
                    const country = response.sys.country;
                    const visibility = response.visibility / 1000; // Convert meters to kilometers

                    // Display weather information
                    weatherInfo.innerHTML = `
                        <h2>Weather in ${city}, ${country}</h2>
                        <p>Description: ${weatherDescription}</p>
                        <p>Temperature: ${temperature}°C</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                        <p>Visibility: ${visibility} km</p>
                        <p>Sunrise: ${sunrise}</p>
                        <p>Sunset: ${sunset}</p>
                    `;
                } else {
                    weatherInfo.innerHTML = `<p>Failed to fetch weather information. Please try again.</p>`;
                }
            };

            // Send the request
            xhr.send();
        } else {
            alert('Please enter a city name.');
        }
    });
});
