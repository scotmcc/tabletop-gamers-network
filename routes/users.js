const express = require('express');
const router = express.Router();

module.exports = (mongoose, routes) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    res.send(mongoose.modelNames());
  });

  return router;
};
