const express = require('express');
const session = require('express-session');
const cors = require('cors');

// Routers
const AuthRouter = require('./routes/AuthRouter.js');
const ItemRouter = require('./routes/ItemRouter.js');

const app = express();
// eslint-disable-next-line max-len
app.use(session({secret: 'mySuperSecretKey1293914871098yAISDHBAUSDI87Y9183YHUHSAISUDHA87SY87123H13UH1HI2UD8S7AHjhsidaa8s7dyb'}));

app.use(express.json());
app.use(cors());
app.use(express.static('../client/build'));

// Routes
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/item', ItemRouter);

module.exports = app;