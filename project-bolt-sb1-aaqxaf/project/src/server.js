import express from 'express';
import songRoutes from './routes/songRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', songRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

const PORT = process.env.PORT || 3000;

// Add error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});