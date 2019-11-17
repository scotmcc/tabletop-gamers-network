const express = require('express');
const router = express.Router();

/**
 * title: String,
 * type: String,
 * theme: String,
 * description: String,
 * comments: [{ body: String, date: Date }],
 * date: { type: Date, default: Date.now },
 * hidden: Boolean,
 * meta: {
 *   votes: Number,
 *   favs: Number
 * }
 */

module.exports = mongoose => {
  const Game = mongoose.models.Game;

  router.get('/', (req, res) => {
    Game.find((err, games) => {
      console.log(games);
      res.render('games', { name: 'games', games });
    });
  });

  router.get('/list', (req, res) => {
    Game.find()
      .sort({ 'meta.votes': 'desc', 'meta.favs': 'desc' })
      .limit(10)
      .exec()
      .then(games => res.send(games));
  });

  router.put('/', (req, res) => {
    var game = new Game(req.body);
    game.save(err => {
      if (err) {
        console.log(err);
      }
      Game.find((err, games) => {
        res.send(games);
      });
    });
  });

  router.post('/vote/:id', (req, res) => {
    console.log('/vote/:id');
    Game.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { 'meta.votes': 1 } },
      { upsert: true, new: true },
      function(err, game) {
        console.log(game);
        if (err) return res.status(500).send(err);
        return res.send(game);
      }
    );
  });

  router.post('/favs/:id', (req, res) => {
    console.log('/favs/:id');
    Game.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { 'meta.favs': 1 } },
      { upsert: true, new: true },
      function(err, game) {
        console.log(game);
        if (err) return res.status(500).send(err);
        return res.send(game);
      }
    );
  });

  router.post('/:id', (req, res) => {
    res.send(mongoose.connected);
  });

  router.delete('/:id', (req, res) => {
    res.send(mongoose.connected);
  });

  return router;
};
