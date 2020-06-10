const fetch = require('node-fetch');

const defaultError = 'An error has occurred';
const apiKey = 'c3e58021321d178c2b55d2533301f39b';
const imageUri = 'https://openweathermap.org/img/wn/';
const imageFormat = '@2x.png';
const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function weatherPage(req, res, next) {
    try {
        return res.status(200).render('weather.html', {
            errors: req.flash('error'),
        });
    } catch (error) {
        req.flash('error', { message: defaultError });
        return next(error);
    }
}

async function getWeather(req, res, next) {
    const { city } = req.body;
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}
    &units=imperial&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const unikDays = {}; // object with sorted days
    for (let i = 0; i < data.list.length; i += 1) {
        const date = new Date(data.list[i].dt_txt);
        if (!unikDays[date.getDate()]) {
            unikDays[date.getDate()] = data.list[i]; // sorted days
        }
    }
    const dayKeys = Object.keys(unikDays);
    const dayNameObj = {};
    const weatherImageObj = {};
    for (let k = 0; k < dayKeys.length; k += 1) {
        const numberDay = `${new Date(unikDays[dayKeys[k]].dt * 1000).getDay()}`; // get the day number from unix format
        dayNameObj[k] = weekday[numberDay]; // give the numbers of the day names
        weatherImageObj[k] = `${imageUri}${unikDays[dayKeys[k]].weather[0].icon}${imageFormat}`; // form the address of the picture
    }
    const dayName = Object.values(dayNameObj); // take values from the object with the names of the days
    const weatherImage = Object.values(weatherImageObj); // take values from the object with the images uri
    console.log(dayName);
    const renameKeys = (keysMap, obj) => Object
        .keys(obj)
        .reduce((acc, key) => ({
            ...acc,
            ... {
                [keysMap[key] || key]: obj[key],
            },
        }), {});
    console.log(city);
    // console.log(renameKeys(dayName, weatherImage));
    res.status(200).json(renameKeys(dayName, weatherImage));
}

module.exports = {
    weatherPage,
    getWeather,
};