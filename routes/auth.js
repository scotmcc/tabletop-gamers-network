const express = require('express');
const router = express.Router();

module.exports = mongoose => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    res.send(mongoose.modelNames());
  });

  return router;
};
