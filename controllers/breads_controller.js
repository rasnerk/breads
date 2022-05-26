const express = require('express')
const breads = express.Router()
const Bread = require('../models/schemas/bread')

// INDEX
breads.get('/', async (req, res) => {
  let allBreads = await Bread.find()
  res.render('index', {breads: allBreads, title: 'Index Page'})
})

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
breads.get('/:breadId/edit', (req, res) => {
  Bread.findById(req.params.breadId, {}, (err,doc) => {
    if (err || doc === null) return res.render('404')
    res.render('edit', {
      bread: doc,
      index: doc._id.toHexString()
    })
  })
})


// SHOW
breads.get('/:breadId', async (req, res) => {
  Bread.findById(req.params.breadId, {}, (err,doc) => {
    if (err || doc === null) return res.render('404')
    res.render('Show', { bread: doc, index: doc._id.toHexString() })
  })
})

// CREATE
breads.post('/', (req, res) => {
  req.body.hasGluten === 'on' ? req.body.hasGluten = true : req.body.hasGluten = false;

  Bread.create(req.body, (err,doc) => {
    if (err || doc === null) return res.render('404')
    res.redirect('/breads')
  })

})

// DELETE
breads.delete('/:breadId', (req, res) => {
  Bread.findByIdAndDelete(req.params.breadId, {}, (err,doc) => {
    if (err || doc === null) return res.render('404')
    res.status(303).redirect('/breads')
  })
})

// UPDATE
breads.put('/:breadId', (req, res) => {
  req.body.hasGluten === 'on' ? req.body.hasGluten = true : req.body.hasGluten = false;

  Bread.findByIdAndUpdate(req.params.breadId, req.body, { new: true }, (err,doc) => {
    if (err || doc === null) return res.render('404')
    res.redirect(`${req.params.breadId}`)
  })
})

// Seed
breads.get('/data/seed', (req,res) => {
  Bread.insertMany(require('../seeders/seed-breads'))
    .then(createdBreads => {
      res.redirect('/breads')
    })
})


module.exports = breads