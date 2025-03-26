
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

async function getCityFromCoordinates(latitude, longitude) {
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await response.json();
        return data.city || data.locality || "Unknown Location";
    } catch (error) {
        console.error("Error fetching city: ", error.message);
        return "Unknown Location";
    }
}

export function weatherDetails() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const cityName = await getCityFromCoordinates(latitude, longitude);

                try {
                    const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=yes`;
                    const response = await fetch(weatherApiUrl);
                    const weatherData = await response.json();

                    resolve({
                        temperature: weatherData?.current?.temp_c,
                        condition: weatherData?.current?.condition?.text,
                        icon: weatherData?.current?.condition?.icon,
                    });
                } catch (error) {
                    console.error("Weather API Error: ", error.message);
                    reject(error);
                }
            }, (error) => {
                console.error("Geolocation Error: ", error.message);
                reject(error);
            });
        } else {
            reject(new Error("Geolocation not supported"));
        }
    });
}
