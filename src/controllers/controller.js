const CardData = require("../models/CardData")

exports.l2dview = (req, res) => {
    let card_id = req.params['card_id']
    res.render('L2Dview', {card_id: card_id})
}

exports.cardview = (req, res) => {
    let card_id = req.params['card_id']
    res.render('Cardview', {card_id: card_id})
}

exports.l2d_body_model = (req, res) => {
    let card_id = req.params['card_id']
    let cap_card_id = card_id.startsWith('card') ? card_id[0].toUpperCase() + card_id.slice(1) : card_id
    res.sendFile(`/live2d_resource/Live2D/${cap_card_id}/body.model.json`, {root: './resources'})
}