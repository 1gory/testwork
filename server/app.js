const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'build')));

app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/auth', require('./routes/auth'));

app.use( '/', indexRouter);

module.exports = app;

