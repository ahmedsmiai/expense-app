const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport')
const cors = require('cors')
const path = require('path')

const v1 = require('./routes/v1')

const app = express()

//---------- DB config -----------//

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('Connected to database')
})
mongoose.connection.on('error', (err) => {
    console.error('failed to connect to database')
})

//---------- Middlewares ---------//

app.use(logger('dev'))

app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())

app.use(passport.session())

require('./config/passport')(passport)

//---------- Routes -----------//

app.use('/api/v1', v1);

//---------- Static files -----------//

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../../client/build')));
    app.get('*', function (req, res)  {
      res.sendFile(
        path.join(__dirname, '../../client', 'build', 'index.html')
      );
    });
  }

//---------- Errors -----------//
app.use((req, res, next) => {
    var err = new Error()
    err.status = 404
    err.message = "Not found url"
    next(err);
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const error = err.message || 'Error processing url request'

    res.status(status).send({
        error
    })
})



module.exports = app;