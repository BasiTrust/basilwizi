var express = require('express');
var router = express.Router();

/* GET public page. */
router.get('/', function(req,res,next) {
  res.redirect('/sites');
});

/**
 * Get Admin Only page
 */
router.get('/superuser', function(req, res){
  res.redirect('/superuser')
});

module.exports = router;
