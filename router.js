'use strict'
const express = require('express'),
app = express(),
router = express.Router(),
sendAboutMsg = `This is a code that visualize the launching of `
+ `four rockets.`
//vizualizeGame = require('./view/vizualize')
app.get('client/index.js', function(req, res){
  res.sendFile(__dirname + '/client/index.js')
})
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  
  console.log('Time: ', Date.now())
  console.log(req.url)
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})
// define the about route
router.get('/about', function (req, res) {
  res.send(sendAboutMsg)
})

module.exports = router