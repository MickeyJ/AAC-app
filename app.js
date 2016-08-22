var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

const user = require('./routes/user');
const phrase = require('./routes/phrase');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', user);
app.use('/api/phrase', phrase);

app.use('*', (req, res, next) =>{
  res.sendFile('index.html', {
    root: __dirname + '/public/'
  });
});

app.use((req, res, next) =>{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) =>{
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;