let city = "izmir"; // immutability
city = city.toLocaleUpperCase( "tr-TR"); // locale: language-country
console.log(`city=${city}`);
city = city.toLocaleUpperCase( "en-US"); // locale: language-country
city = city.toLocaleUpperCase( "en-UK"); // locale: language-country

