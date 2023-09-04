const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config({
  path: path.join(__dirname, '.env')
});

const app = express();
const PORT = 4000;
const { MONGO_URL } = process.env;

// Middlewares
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000" // React developer server
}));

function logger(req, res, next) {
  const ts = new Date();
  console.log(`[${ts}]: ${req.method} ${req.originalUrl}`);
  next();
}

app.use(logger);

// API routes

const languageRouter = require('./routes/language');
app.use('/api/v2/languages', languageRouter);

const feedbackRouter = require('./routes/feedback');
app.use('/api/v2/feedbacks', feedbackRouter);

// Landing URL
app.get('/', (req, res) => {
  res.send('Popular programming languages API 2.0');
});

async function main() {
  await mongoose.connect(MONGO_URL);
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

main()
