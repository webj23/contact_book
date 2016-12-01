var express = require('express');
var router = express.Router();

// home
router.get('/', function(req, res) {
  console.log('Home');
  res.redirect('/contacts');
});

module.exports = router;
