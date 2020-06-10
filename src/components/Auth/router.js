const { Router } = require('express');
const csrf = require('csurf');
const AuthUserComponent = require('../Auth');
const Auth = require('../../polices/isAuth');

const csrfProtection = csrf({ cookie: true });

/**
 * Express router to auth user related functions on.
 * @type {Express.Router}
 * @const
 */
const authUserRouter = Router();

/**
 * Route get user login page
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.get('/login', csrfProtection, AuthUserComponent.loginPage);

// authUserRouter.get('/weather', AuthUserComponent.weatherPage);
// authUserRouter.post('/weather', AuthUserComponent.getWeather);

/**
 * Route post user login action
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.post('/login', csrfProtection, AuthUserComponent.login);

/**
 * Route get user logout action
 * @name /v1/auth/logout
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.get('/logout', AuthUserComponent.logout);

/**
 * Route get not authorized user 401 page
 * @name /v1/auth/401
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.get('/401', AuthUserComponent.anauthorized);

/**
 * Route get user forbidden page 403
 * @name /v1/auth/403
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.get('/403', AuthUserComponent.forbidden);

/**
 * Route get user private page
 * @name /v1/auth/private
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.get('/private', AuthUserComponent.passport);

/**
 * Route get user register page
 * @name /v1/auth/register
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.get('/register', csrfProtection, AuthUserComponent.register);

/**
 * Route post create new user
 * @name /v1/auth/createUser
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.post('/createUser', csrfProtection, AuthUserComponent.createUser);

authUserRouter.delete('/delete', csrfProtection, AuthUserComponent.deleteById);
/**
 * Route post update user JWT token
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.post('/updateToken', Auth.isAuthJWT);

module.exports = authUserRouter;