const express = require('express');
const path = require('path');
const controllers = require('./src/controllers/controller')
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

app.get('/L2Dview/:card_id', controllers.l2dview)

app.get('/Cardview/:card_id', controllers.cardview)

app.get('/live2d_resource/:card_id-body.model.json', controllers.l2d_body_model)

// app.get('/resources/*', (req, res) => {
//     console.log(req.params[0])
//     res.sendFile(req.params[0])
// })

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})