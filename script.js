document.addEventListener("DOMContentLoaded", function() {
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            const countryList = document.getElementById("countryList");

            data.forEach(country => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "col-sm-12", "mb-3");

                const cardBody = document.createElement("div");
                cardBody.classList.add("card", "shadow");

                // const cardContent = `
                //     <div class="card-header">
                //         <h5 class="card-title">${country.name.common}</h5>
                //     </div>
                //     <div class="card-body">
                //         <p class="card-text">Capital: ${country.capital}</p>
                //         <p class="card-text">Region: ${country.region}</p>
                //         <button class="btn btn-primary" onclick="fetchWeather('${country.name.common}')">Click for Weather</button>
                //         <div id="${country.name.common.replace(/\s+/g, '')}Weather"></div>
                //     </div>
                // `;
                const cardContent = `
    <div class="card-header" style = "background-color:yellow">
        <h5 class="card-title" style = "text-align : center">${country.name.common}</h5>
    </div>
    <div class="card-body" style="background-color:aqua">
        <img src="${country.flags.svg}" alt="Flag" style="width: 200px;height:150px" ></p>
        <p class="card-text">Capital: ${country.capital}</p>
        <p class="card-text">Latitude: ${country.latlng.join(', ')}</p>
        
        <p class="card-text">Region: ${country.region}</p>
        <p class="card-text">Country Codes: ${Object.keys(country.ccn3).map(code => country.ccn3[code]).join(',')}</p>
        <button class="btn btn-primary" onclick="fetchWeather('${country.name.common}')">Click for Weather</button>
        <div id="${country.name.common.replace(/\s+/g, '')}Weather"></div>
    </div>
`;


                cardBody.innerHTML = cardContent;
                card.appendChild(cardBody);
                countryList.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching countries:", error));
});

function fetchWeather(countryName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=712f7894adf7a28ba2bb905b9b99b404`)
        .then(response => response.json())
        .then(data => {
            const weatherDiv = document.getElementById(`${countryName.replace(/\s+/g, '')}Weather`);

            if (data.main && data.weather) {
                const weatherText = `
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Description: ${data.weather[0].description}</p>
                `;
                weatherDiv.innerHTML = weatherText;
            } else {
                weatherDiv.innerHTML = "<p>No weather data available</p>";
            }
        })
        .catch(error => console.error("Error fetching weather:", error));
}
// https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=YOUR_OPENWEATHERMAP_API_KEY&units=metric