require('dotenv').config();
const mongoose = require('mongoose');
const userSchema = require('../user');

const User = mongoose.model('User', userSchema);

function runTest(err) {
  if (err) return console.log(err);
  console.log('Mongoose connected');

  const testUser = new User({
    username: 'jmar777',
    password: 'Password123',
    email: 'jmar777@gmail.com',
    first: 'Jamal',
    last: 'Marlin',
    bio: 'New User'
  });
  console.log('User created', testUser);

  testUser.save(function(err) {
    if (err) return console.log(err);
    console.log('User saved');

    User.findOne({ username: 'jmar777' }, async function(err, user) {
      if (err) return console.log(err);
      console.log('User located', user);

      await user.comparePassword('Password123', function(err, isMatch) {
        if (err) return console.log(err);
        console.log('Password123:', isMatch);
      });

      await user.comparePassword('123Password', function(err, isMatch) {
        if (err) return console.log(err);
        console.log('123Password:', isMatch);
      });

      User.deleteOne({ username: 'jmar777' }, function(err) {
        if (err) return console.log(err);
        console.log('Deleted user');
        mongoose.connection.close();
      });
    });
  });
}

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, runTest);
