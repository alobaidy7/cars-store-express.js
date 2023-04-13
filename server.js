const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

require("dotenv").config();
const carRoute = require('./routes/carRoute');
const connectToDB = require('./config/connectToDB');
const router = require("./routes/authRoute");

// Connect with db
connectToDB();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/cars', carRoute);
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"))

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
