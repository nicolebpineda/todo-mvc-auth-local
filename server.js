const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)

    // Need to figure out how to move these to routes for better organization
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile'] }))

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google', { failureRedirect: '/login' }), 
        (req, res) => {
          // Successful authentication, reditect to a different rout or send a response
            res.redirect('/todos')
        }
    )

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    