const express = require('express');

const myRouter = require('./src/routes/router');
const myServer = require('./src/services/server');
const myMiddleware = require('./src/middleware/appMiddleware');

const app = express();

myMiddleware.loadMiddleware(app);
myRouter.registerRoutes(app);
myServer.runServer(app);
