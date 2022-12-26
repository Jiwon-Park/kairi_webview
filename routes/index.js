var express = require('express');
var router = express.Router();
const { getitem } = require("../services/DynamoDBService");
const slowDown = require('express-slow-down')
const speed_limit = slowDown({
    windowMs: 1 * 60 * 1000,
    delayAfter: 5,
    delayMs: 1000
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/L2Dview/:card_id', speed_limit, async (req, res, next) => {
    try {
	    let card_id = req.params['card_id']
	    res.render('L2Dview', {card_id: card_id})
    } catch (error) {
	    next(error)
    }
})

router.get('/Cardview/:card_id', async (req, res, next) => {
    try {
        let card_id = req.params['card_id']
        let card_data = await getitem(card_id)
        // console.log(card_data)
        res.render('Cardview', {card_id: card_id, card_data: card_data})
    } catch (error) {
        next(error)
    }
})

router.get('/live2d_resource/:card_id-body.model.json', async (req, res, next) => {
    try {
	    let card_id = req.params['card_id']
	    let cap_card_id = card_id.startsWith('card') ? card_id[0].toUpperCase() + card_id.slice(1) : card_id
	    res.sendFile(`/live2d_resource/Live2D/${cap_card_id}/body.model.json`, {root: './resources'})
    } catch (error) {
        next(error)
    }
})

router.get('/live2d_resource/Live2D/:card_id/moc/*', speed_limit, function (req, res, next) {
//   console.log(req.url)
  next()
})

router.get('/error', async (req, res, next) => {
    try {
        throw new Error('this is an error')
    } catch (error) {
        next(error)
    }
})

module.exports = router;
