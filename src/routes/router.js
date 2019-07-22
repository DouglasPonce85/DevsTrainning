const categoryRouter = require('./api/category');
const sucursalesRouter = require('./api/sucursales');

module.exports = {
    registerRoutes: (app) => {
        app.use('/', categoryRouter);
        app.use('/', sucursalesRouter);
        app.get('/', (req, res) => {
            res.send({ data: 'DevsTrainning ~ 2019' });
        });
    }
};
