require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const config = require('./config');
const dbconnect = require('./config/dbconnect');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('combined'));
}

routes(app);

dbconnect();

app.listen(config.port, () => {
	console.log(`Server started on port ${config.port}`);
});

module.exports = app;