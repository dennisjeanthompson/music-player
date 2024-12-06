const express = require('express');
const setupMiddleware = require('./config/middleware');
const songRoutes = require('./routes/songRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup middleware
setupMiddleware(app);

// Routes
app.use('/', songRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});