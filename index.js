const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.post('/message', (req, res) => {
    res.render('index', {
        title: 'Tabletop Gamers Network',
        message: 'Message Title!',
        message_body: 'This is the body!'
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
