const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');


const app = express();
app.use(express.json());
// Enable CORS used for cross plateform connection means requests from other port are accepted
app.use(cors());
// Dev logging middleware used to give url code details, such as request method status code, response time, helps in debugging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}



// Routes
const attractionRoutes = require('./routes/AttractionRoutes');
const visitorRoutes = require('./routes/VisitorRoutes');
const reviewRoutes = require('./routes/ReviewRoutes');

app.use('/api/attractions', attractionRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/reviews', reviewRoutes);


// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Tourism Management API',
    version: '1.0.0'
  });
});





// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});


// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Port configuration
const PORT = 3000;



// Database connection
mongoose.connect('mongodb://localhost:27017/Tourism')
.then(() => {
  // Start server
  app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });

  console.log('MongoDB Connected...');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});






// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.log('Error:', err.message);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });