const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
  res.render('index', {breads: Bread, title: 'Index Page'})
})

// SHOW
breads.get('/:arrayIndex', (req, res) => {
  const { arrayIndex } = req.params;
  res.send(Bread[arrayIndex])
})  

module.exports = breads