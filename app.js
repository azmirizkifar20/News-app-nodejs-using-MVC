require('./libs/handlebars-helpers');
const path = require('path');
const moment = require('moment');
const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const app = express();

// set view dan view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set public folder as assets
app.use('/assets', express.static(__dirname + '/public'));

// set routing
app.use('/', routes);

// buat server
app.listen(3000, () => {
    console.log('Server running at port 3000');
});

var date = moment().format('YYYY-MM-DD');
console.log('today we code at ' + date);