const Bread = require('../models/schemas/bread')
const Baker = require('../models/schemas/baker')

const fetchAllBreads = async (req, res) => {
  let allBreads = await Bread.find()
  res.render('index', {breads: allBreads, title: 'Index Page'})
}

const renderNewPage = (req, res) => {
  Baker.find().then(foundBakers => {
    res.render('new', {bakers: foundBakers} )
  })
  // res.render('new')
}

const renderEditPage =  (req, res) => {
  Bread.findById(req.params.breadId, {}, async (err,doc) => {
    if (err || doc === null) return res.render('404')
    let allBakers = await Baker.find()
    res.render('edit', {
      bread: doc,
      bakers: allBakers, 
      index: doc._id.toHexString()
    })
  }).populate('baker')
}

const renderSingleBread = async (req, res) => {
  Bread.findById(req.params.breadId, {}, (err,doc) => {
    if (err || doc === null) return res.render('404')
    res.render('Show', { bread: doc, index: doc._id.toHexString() })
  }).populate('baker')
}

const createNewBread = (req, res) => {
  req.body.hasGluten === 'on' ? req.body.hasGluten = true : req.body.hasGluten = false;

  Bread.create(req.body, (err,doc) => {
    if (err || doc === null) return res.render('404')
    res.redirect('/breads')
  })
}

const deleteBread = (req, res) => {
  Bread.findByIdAndDelete(req.params.breadId, {}, (err,doc) => {
    if (err || doc === null) return res.render('404')
    res.status(303).redirect('/breads')
  })
}

const editBread = (req, res) => {
  req.body.hasGluten === 'on' ? req.body.hasGluten = true : req.body.hasGluten = false;

  Bread.findByIdAndUpdate(req.params.breadId, req.body, { new: true }, (err,doc) => {
    if (err || doc === null) return res.render('404')
    res.redirect(`${req.params.breadId}`)
  })
}

const seedBreadData = (req,res) => {
  Bread.insertMany(require('../seeders/seed-breads'))
    .then(createdBreads => {
      res.redirect('/breads')
    })
}

module.exports = { fetchAllBreads, renderNewPage, renderEditPage, renderSingleBread, createNewBread, deleteBread, editBread, seedBreadData }