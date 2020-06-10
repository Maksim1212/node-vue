const { Router } = require('express');
const csrf = require('csurf');
const WeatherComponent = require('../Weather');
const { isAuthJWT } = require('../../polices/isAuth');

const csrfProtection = csrf({ cookie: true });
/**
 * Express router to auth user related functions on.
 * @type {Express.Router}
 * @const
 */
const weatherRouter = Router();

/**
 * Route get user login page
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */


weatherRouter.get('/', WeatherComponent.weatherPage);
weatherRouter.post('/', WeatherComponent.getWeather);


module.exports = weatherRouter;