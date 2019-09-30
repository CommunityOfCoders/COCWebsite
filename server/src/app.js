require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const routes = require('./routes')
const config = require('./config')
const dbconnect = require('./config/dbconnect')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

routes(app)

dbconnect()

app.listen(config.port, () => {
	console.log(`Server started on port ${config.port}`);
});