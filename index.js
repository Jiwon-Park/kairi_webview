const express = require('express');
const path = require('path');
const app = express();
const port = 5000


app.set('view engine', 'pug');
app.use(express.static('resources'))

app.get('/', (req, res) => {
    res.send('hello world');
})

app.get('/L2Dview/:card_id', (req, res) => {
    let card_id = req.params['card_id']
    res.render('L2Dview', {card_id: card_id})
})

app.get('/Imgview/:card_id', (req, res) => {
    let card_id = req.params['card_id']
    res.render('Imgview', {card_id: card_id})
})

app.get('/live2d_resource/:card_id-body.model.json', (req, res) => {
    let card_id = req.params['card_id']
    card_id[0] = card_id[0].toUpperCase()
    res.sendFile(`/live2d_resource/Live2D/${card_id}/body.model.json`, {root: './resources'})
})

app.get('/resources/*', (req, res) => {
    console.log(req.params[0])
    res.sendFile(req.params[0])
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})