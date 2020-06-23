const fetch = require('node-fetch');

const defaultError = 'An error has occurred';
const apiKey = 'c3e58021321d178c2b55d2533301f39b';
const imageUri = 'https://openweathermap.org/img/wn/';
const imageFormat = '@2x.png';
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let weatherObj = {
    date: null,
    image: null,
    temp: null,
    humudity: null,
    description: null,
    wind: null,
    error: null,
    actually: false,
};

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

/**
 * @function renameKeys
 * @param {express.Request} dayName && weatherImage
 * @param {express.Response} return object where keys is days names and values is weatherImages
 * @returns {Promise < object >}
 */

const renameKeys = (keysMap, obj) => Object
    .keys(obj)
    .reduce((acc, key) => ({
        ...acc,
        ... {
            [keysMap[key] || key]: obj[key],
        },
    }), {});

async function getWeather(req, res, next) {
    try {
        const { city } = req.body;
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}
    &units=imperial&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.cod);

        const unikDays = {}; // object with sorted days

        for (let i = 0; i < data.list.length; i += 1) {
            const date = new Date(data.list[i].dt_txt);
            if (!unikDays[date.getDate()]) {
                unikDays[date.getDate()] = data.list[i]; // sorted days take 5 days
            }
        }

        const dayKeys = Object.keys(unikDays);
        // console.log(data.list[2].dt_txt);
        const dayNameObj = {};
        const weatherImageObj = {};
        const dateTxt = {};
        const tempObj = {};
        const humidityObj = {};
        const weatherDescObj = {};
        const windObj = {};

        for (let k = 0; k < dayKeys.length; k += 1) {
            const numberDay = `${new Date(unikDays[dayKeys[k]].dt * 1000).getDay()}`; // get the day number from unix format
            dayNameObj[k] = weekday[numberDay]; // give the numbers of the day names
            tempObj[k] = Math.round((unikDays[dayKeys[k]].main.temp - 32) * (5 / 9));
            humidityObj[k] = unikDays[dayKeys[k]].main.humidity;
            weatherImageObj[k] = `${imageUri}${unikDays[dayKeys[k]].weather[0].icon}${imageFormat}`; // form the address of the picture
            dateTxt[k] = (unikDays[dayKeys[k]].dt_txt).slice(5, -9); // push data format 'month-day'
            weatherDescObj[k] = unikDays[dayKeys[k]].weather[0].description;
            windObj[k] = unikDays[dayKeys[k]].wind.speed;
        }

        const dayName = Object.values(dayNameObj); // take values from the object with the names of the days
        const weatherImage = Object.values(weatherImageObj); // take values from the object with the images uri
        const temp = Object.values(tempObj);
        const dateNow = Object.values(dateTxt);
        const humidity = Object.values(humidityObj);
        const weatherDesc = Object.values(weatherDescObj);
        const wind = Object.values(windObj);

        const weatherDate = renameKeys(dayName, dateNow);
        const weatherImg = renameKeys(dayName, weatherImage);
        const weatherTemp = renameKeys(dayName, temp);
        const weatherHumudity = renameKeys(dayName, humidity);
        const weatherDescription = renameKeys(dayName, weatherDesc);
        const weaytherWind = renameKeys(dayName, wind);

        weatherObj = {
            date: weatherDate,
            image: weatherImg,
            temp: weatherTemp,
            humudity: weatherHumudity,
            description: weatherDescription,
            wind: weaytherWind,
            actually: true,
        };
        // res.status(200).json(renameKeys(dayName, weatherImage));
        // console.log('try');
        return res.status(200).json(weatherObj);
    } catch (error) {
        console.log('catch');
        weatherObj.error = 'Entered city not found';
        weatherObj.actually = false;
        console.log(weatherObj);
        res.status(200).json(weatherObj);

        return next(error);
    }
}

function moreWeatherPageRender(req, res, next) {
    try {
        return res.status(200).render('more.html', {
            errors: req.flash('error'),
        });
    } catch (error) {
        req.flash('error', { message: defaultError });
        return next(error);
    }
}
async function getMoreWeather(req, res, next) {
    const city = 'Kiev';
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}
    &units=imperial&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.cod);

    let unikDays = {}; // object with sorted days

    for (let i = 0; i < data.list.length; i += 1) {
        unikDays[i] = data.list[i].dt_txt;
    }
    // console.log(parseFloat(Object.keys(unikDays)));
    // console.log(unikDays);

    const dayKeys = Object.keys(unikDays);
    const dayNameObj = {};

    for (let k = 0; k < dayKeys.length; k += 1) {
        const numberDay = `${new Date(unikDays[dayKeys[k]].dt * 1000).getDay()}`; // get the day number from unix format
        dayNameObj[k] = weekday[numberDay]; // give the numbers of the day names
    }
    // console.log(dayNameObj);
}

getMoreWeather('Kiev');

module.exports = {
    weatherPage,
    getWeather,
    getMoreWeather,
    moreWeatherPageRender,
};
