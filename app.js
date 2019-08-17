window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');

  const geoLocation = navigator.geolocation
    ? navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/44331617d0fb365dfd35616d0193c092/${lat},${long}`;

        fetch(api)
          .then(response => {
            return response.json();
          })
          .then(data => {
            console.log(data);
            const { temperature, summary, icon } = data.currently;

            // Aseta DOM-elementit datan mukaiseksi
            temperatureDegree.textContent = Math.floor(
              (temperature - 32) / 1.8
            );
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            // Aseta oikea ikoni
            setIcons(icon, document.querySelector('.weather-icon'));
          });
      })
    : alert('Salli sijainnin haku selaimessasi');

  const setIcons = (icon, iconID) => {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  };
});
