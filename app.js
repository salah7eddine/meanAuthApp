const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database, {
  useNewUrlParser: true
});

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to dababase '+ config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+ err);
});

const app = express();

const users = require('./routes/users');

const port = process.env.PORT || 8080;

// Cors Middleware
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accespt, Authorization');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware 
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users); 

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(payh.join(__dirname, 'public/index.html'));
})

// Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
