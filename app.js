const express = require('express');

const myRouter = require('./routes/router');
const myServer = require('./services/server');
const myMiddleware = require('./middleware/appMiddleware');

const app = express();

myMiddleware.loadMiddleware(app);
myRouter.registerRoutes(app);
myServer.runServer(app);
