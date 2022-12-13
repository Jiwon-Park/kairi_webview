const express = require('express');
const path = require('path');
const app = express();
let port

if(process.argv.length > 2) {
    let nextisport = false;
    for (const key in process.argv) {
        if (Object.hasOwnProperty.call(process.argv, key)) {
            const element = process.argv[key];
            if (nextisport) {
                port = parseInt(element);
                break;
            }
            if (element === "-p" || element === "--port") {
                nextisport = true;
            }
        }
    }
}
if(typeof port === 'undefined'){
    port = 5000;
}

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
    let cap_card_id = ""
    if (card_id.startsWith('card')) {
        cap_card_id = card_id.charAt(0).toUpperCase() + card_id.slice(1);
    } else {
        cap_card_id = card_id;
    }
    res.sendFile(`/live2d_resource/Live2D/${cap_card_id}/body.model.json`, {root: './resources'})
})

app.get('/resources/*', (req, res) => {
    console.log(req.params[0])
    res.sendFile(req.params[0])
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})