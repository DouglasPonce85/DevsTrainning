const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');

const app = express();

const coffeeRouter = require('./src/routes/coffeeshops');
const reviewRouter = require('./src/routes/reviews');

app.use('/', coffeeRouter);
app.use('/', reviewRouter);
app.get('/', (req, res) => {
	res.send({ data: 'DevsTrainning ~ 2019' });
});

const serverPort = process.env.PORT || 4500;

app.listen(serverPort, () => {
	console.log(`Listening @ port ${chalk.yellow(serverPort)}`);
});