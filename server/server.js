var express = require('express');
var mongoose = require('mongoose');

var app = express();

var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/helpme';
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Mongodb connection open');
});

// middleware and routing configuration
require('./config/middleware.js')(app, express);
require('./config/route.js')(app, express);

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Server is running on ' + port);

module.exports = app;
