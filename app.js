/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const { Model } = require('objection');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

dotenv.config({ path: '.env' });

const routes = require('./app/routes');
const knex = require('./database/knex');

Model.knex(knex);
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}
const app = express();
const port = 8080;
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
Object.keys(routes).map((route) => app.use('/api', routes[route]));

app.use((req, res) => {
  res.status(404).send('Api not found');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
