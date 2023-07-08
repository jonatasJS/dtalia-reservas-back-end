/* setting environment variables */
require('dotenv').config();
console.clear();

/* necessary dependencies */
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const logs = require('node-color-log');
const mongoose = require('mongoose');

/* initializing server */
const app = express();
const routes = require('./utils/routes');

/* configs of server */
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uriForMongodb = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@dtalia.pro9mv6.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uriForMongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logs
      .color('green')
      .bold()
      .log('✅ Conectado ao MongoDB');
  })
  .catch((error) => {
    logs
      .color('red')
      .bold()
      .log('❌ Erro ao conectar ao MongoDB:', error);
  });

app.use(routes);

/* starting the server on the port of the `PORT` variable which is in `porcess.env.PORT` */
app.listen(process.env.PORT, () => {
  logs
    .color('green')
    .bold()
    .log(`✅ The server is running on the port ${process.env.PORT}`)
})