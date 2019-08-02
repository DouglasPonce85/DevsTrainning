const categoryRouter = require('./api/category');
const sucursalesRouter = require('./api/sucursales');
const rolesRouter = require('./api/roles');
const usersRouter = require('./api/users');
const errorManager = require('../middleware/errorManager');
const consts = require('../configs/consts');

module.exports = {
    registerRoutes: (app) => {
        app.use('/', categoryRouter);
        app.use('/', sucursalesRouter);
        app.use('/', rolesRouter);
        app.use('/', usersRouter);
        app.get('/', (req, res) => {
            res.send({ data: 'DevsTrainning ~ 2019' });
        });
    },

    setErrorHandlingRoutes: (app) => {
		app.get('*', (req, res, next) => {
			setImmediate(() => {
				next({
                    errorType: consts.typeErrors.URL_NOT_DEFINED,
                    message: consts.urlNotDefinedErrorMsg
                });
			});
		});

		// Mount the unexpected error handler last
		app.use(errorManager.handleUnexpectedError);
	}
};
