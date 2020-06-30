const UserService = require('./service');
const UserValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');

const dbError = 'MongoError: E11000 duplicate key error collection';
const defaultError = 'An error has occurred';
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */

async function usersPageRender(req, res, next) {
    try {
        return res.status(200).render('users.html', {
            errors: req.flash('error'),
        });
    } catch (error) {
        req.flash('error', { message: defaultError });
        return next(error);
    }
}

async function findAll(req, res, next) {
    try {
        const users = await UserService.findAll();

        return res.status(200).json(
            users,
            // csrfToken: req.csrfToken(),
            // errors: req.flash('error'),
        );
    } catch (error) {
        req.flash('error', { message: defaultError });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
    try {
        const { error } = UserValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await UserService.findById(req.params.id);
        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function create(req, res, next) {
    try {
        const { error } = UserValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await UserService.create(req.body);
        return res.status(200).json({
            message: 'user added successfully',
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.status(201).json({
                message: req.flash('error', error.message.data),
            });
        }
        if (error.name === 'MongoError') {
            return res.status(202).json({
                message: dbError,
            });
        }
        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById(req, res, next) {
    try {
        const { error } = UserValidation.updateById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await UserService.updateById(req.body.id, req.body);

        return res.status(200).json({
            message: 'user updated successfully',
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.status(201).json({
                message: req.flash('error', error.message.data),
            });
        }
        if (error.name === 'MongoError') {
            return res.status(202).json({
                message: defaultError,
            });
        }

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    try {
        const { error } = UserValidation.deleteById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }
        await UserService.deleteById(req.body.id);
        return res.status(200).json({
            message: 'user deleted successfully',
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.status(201).json({
                message: req.flash('error', error.message.data),
            });
        }
        if (error.name === 'MongoError') {
            console.log(req.flash('error', { message: defaultError }));
            return res.status(202).json({
                message: defaultError,
            });
        }
        return next(error);
    }
}

module.exports = {
    usersPageRender,
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
