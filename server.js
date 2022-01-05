// express and controller variables
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const axios = require('axios');
const cors = require('cors');


// Initializes Sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const hbs = exphbs.create({});

// create an instance of express, and set the port to 3001
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'This is a secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// for POST and PUT requests: You are asking the server to accept or store data that is in the
// body (req.body) of that request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// app.use(
//   cors({
//     origin: '*',
//     methods: ['GET','POST'],
//     allowedHeaders: ['Content-Type', 'Authorization-Bearer'],
//     optionsSuccessfulStatue: 204
// }));
app.use(routes);

// runs sequelize and checks if there is a database , if not, then it will run the schema and creates
// the database, then the server will start up. 
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT}`
    ));
});



