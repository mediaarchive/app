var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var basicAuth = require('basic-auth-connect');
var package = require('../package.json');
var config = require('../config.json');

router.use(basicAuth(function(user, pass){
	return typeof config.users[user] !== 'undefined' && sha1(pass) === config.users[user].pass
}))

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(package)
    res.render('index', {
    	assets: package.assets,
    });
});

module.exports = router;