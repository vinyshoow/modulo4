const express = require('express');
const instructors = require('./instructors');


const routes = express.Router();

routes.get('/', function(req, res) {
  return res.redirect('instructors');
})

routes.get('/instructors', function(req, res) {
  return res.render('instructors/index');
})

routes.get('/instructors/create', function(req, res) {
  return res.render('instructors/create');
})
  
routes.post('/instructors', instructors.post);
routes.get('/instructors/:id', instructors.show);
routes.get('/instructors/:id/edit', instructors.edit);
routes.put('/instructors', instructors.put);


routes.get('/members', function(req, res) {
  return res.send('Members');
})

module.exports = routes;