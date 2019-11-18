const express = require('express');
const router = express.Router();
const socket = require('socket.io')({
  path: '/user'
});

module.exports = mongoose => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    res.send(mongoose.modelNames());
  });

  return router;
};
