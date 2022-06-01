// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const app = express()

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!')
})
  
// Breads
app.use('/breads', require('./routes/breads_route'))
// Bakers
app.use('/bakers', require('./routes/bakers_route'))
// 404 Page
app.get('*', (req, res) => {
  res.render('404')
})

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then( () => app.listen(process.env.PORT, () => console.log(`Database Connected : Server Running`)))
  .catch( (err) => console.log(err.message) )
