const { getitem } = require("../services/DynamoDBService");


const l2dview = (req, res, next) => {
    let card_id = req.params['card_id']
    res.render('L2Dview', {card_id: card_id})
}

const cardview = async (req, res, next) => {
    try {
        let card_id = req.params['card_id']
        let card_data = await getitem(card_id)
        // console.log(card_data)
        res.render('Cardview', {card_id: card_id, card_data: card_data})
    } catch (error) {
        next(error)
    }
}

const l2d_body_model = (req, res, next) => {
    let card_id = req.params['card_id']
    let cap_card_id = card_id.startsWith('card') ? card_id[0].toUpperCase() + card_id.slice(1) : card_id
    res.sendFile(`/live2d_resource/Live2D/${cap_card_id}/body.model.json`, {root: './resources'})
}

module.exports = {
    l2dview: l2dview,
    cardview: cardview,
    l2d_body_model: l2d_body_model
}