var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth');

// GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post ('/login', function(req, res, next) {
// signup 
// email uit request halen
// password uit request halen
//bcrypt encrypt



});

module.exports = router;