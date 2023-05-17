const express = require('express');
const morgan = require('morgan');
const serveFavicon = require('serve-favicon');
const sequelize = require('./db/sequelize');
const cors = require('cors');

const app = express();
const port = 3005;

app.use(cors({
  origin: 'http://localhost:3004'
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3004');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(morgan('dev'))
  .use(serveFavicon(__dirname + '/favicon.ico'))
  .use(express.json());

sequelize.initDb();

const serviceRouter = require('./routes/serviceRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

app.use('/api/services', serviceRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

app.listen(port, () => {
  console.log(`L'app sur le port ${port}`);
});





