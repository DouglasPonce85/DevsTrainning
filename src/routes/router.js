const categoryRouter = require('./api/category');

module.exports = {
    registerRoutes: (app) => {
        app.use('/', categoryRouter);
        app.get('/', (req, res) => {
            res.send({ data: 'DevsTrainning ~ 2019' });
        });
    }
};
