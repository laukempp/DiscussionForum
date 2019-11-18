var express = require("express");
var router = express.Router();

//Set JSON as the content-type
router.use(function (req, res, next) {
  res.set('Content-Type', 'application/json');
  next();
});

/* GET topics. */
router.route('/').get
)


get("/", function(req, res, next) {
  res.send("respond with a resource");
});

//POST a topic
// router.post

// router.delete

// router.put

module.exports = router;
