var express = require('express');
var router = express.Router();
var package = require('../package.json')

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(package)
    res.render('index', {
    	assets: package.assets,
    });
});

module.exports = router;