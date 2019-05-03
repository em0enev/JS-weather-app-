window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/'
            // with proxy i can fetch data from api on localhost

            const api = `${proxy}https://api.darksky.net/forecast/fbeb2426d53cdf8fd2a5f327acd7af8e/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json()
                }).then(data => {
                    console.log(data)

                    const { temperature, summary, icon } = data.currently
                    const timezone = data.timezone;

                    temperatureDegree.textContent = temperature;
                    locationTimezone.textContent = timezone;
                    temperatureDescription.textContent = summary;

                    setIcons(icon, document.querySelector(".icon"));

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C"
                            temperatureDegree.textContent = ((temperature - 32) * 5 / 9).toFixed(2);
                        } else {
                            temperatureSpan.textContent = "F"
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
});