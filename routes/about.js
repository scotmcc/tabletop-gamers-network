const express = require('express');
const router = express.Router();

module.exports = (mongoose, routes) => {
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('about', { name: 'about' });
  });
  return router;
};
