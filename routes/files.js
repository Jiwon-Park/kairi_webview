var express = require('express');
var router = express.Router();
const slowDown = require("express-slow-down");
const path = require('path')

const speed_limit = slowDown({
    windowMs: 10 * 60 * 1000,
    delayAfter: 100,
    delayMs: 1000
})

/* GET users listing. */
router.get('/buddy/:file_name', speed_limit, function (req, res, next) {
  let file_name = req.params['file_name']
  res.sendFile(path.join(__dirname,`../resources/cardimg/buddy/${file_name}`))
})
router.get('/:file_name', speed_limit, function(req, res, next) {
  let file_name = req.params['file_name']
  res.sendFile(path.join(__dirname, `../resources/cardimg/${file_name}`))
});

module.exports = router;
