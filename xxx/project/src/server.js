const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const songRoutes = require('./routes/songRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', songRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});