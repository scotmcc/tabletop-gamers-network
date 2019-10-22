const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const mongo = 'mongodb+srv://tgn:Selen1um@tgn-cluster0-63rgv.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (!err) {
        console.log('Database Connected!');
    }
});

app.use(express.static('public'));

app.post('/newest-blog', (req, res) => {
    res.json({
        title: 'Blog Message!',
        message: 'This is the blog body!'
    });
});

app.post('/welcome', (req, res) => {
    res.json({
        title: 'Welcome!',
        message: 'This is simply a place to find nearby tabletop gamers. Make sure to register so other gamers can find you. If your favorite game is not available, feel free to add the game to our games listing. If you are looking for a group, check out the Groups page to find a game near you. If you\'re a game master looking for a group, create a gaming group and make a post in the forum inviting people to check out your group request.!'
    });
});

app.post('/about', (req, res) => {
    res.json({
        title: 'About Us!',
        message: 'This is a simple website built and maintained by Scot McConnaughay. If you have found an issue or have a question not covered by the below FAQs, please contact me!'
    });
});

app.post('/newest-member', (req, res) => {
    res.json({
        name: 'Mary Jane!',
        about: 'My name is Mary Jane. I love gaming, long walks on the beach, and red wine! I also like to dance!',
        logo: 'media/character-one-archive.jpg'
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
