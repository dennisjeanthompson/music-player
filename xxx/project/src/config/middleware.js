const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

function setupMiddleware(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride('_method'));
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, '../public')));

  // View engine setup
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));
}

module.exports = setupMiddleware;