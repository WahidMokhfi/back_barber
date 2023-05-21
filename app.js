const express = require('express');
const morgan = require('morgan');
const serveFavicon = require('serve-favicon');
const sequelize = require('./db/sequelize');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3005;

// Configuration CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors());

app.use(morgan('dev'))
  .use(serveFavicon(path.join(__dirname, 'favicon.ico')))
  .use(express.json());

sequelize.initDb();

// Importez les fichiers de routes
const serviceRouter = require('./routes/serviceRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// Utilisez les routes correspondantes
app.use('/api/services', serviceRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

app.listen(port, () => {
  console.log(`L'app sur le port ${port}`);
});







