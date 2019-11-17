const express = require('express');
const router = express.Router();

module.exports = mongoose => {
  const index = res => res.render('index', { name: 'index' });

  router.get('/', function(req, res) {
    index(res);
  });

  router.get('/home', function(req, res) {
    index(res);
  });

  router.get('/index.html', function(req, res) {
    index(res);
  });

  return router;
};
