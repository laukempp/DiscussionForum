var express = require("express");
var router = express.Router();

/* import { deleteTopicWithId } from '../service/request.service.js'; */
var db = require("../service/request.service.js");
//Set JSON as the content-type
router.use(function(req, res, next) {
  res.set("Content-Type", "application/json");
  next();
});

/* GET topics. */
router
  .route("/")

  .get(function(req, res, next) {
    db.getAllTopics(function(topics, err) {
      if (err) res.status(500).send(JSON.stringify(err.message));
      else res.send(JSON.stringify(topics));
    });
  })
  .post(function(req, res) {
    db.createTopic(req, function(results) {
      res.status(201);
      res.json(results).end();
    });
  });
router
  .route("/:id")
  .get(function(req, res) {
    const idInt = parseInt(req.params.id);
    /* if(idInt = NaN){res.status(400).send(); return;} */
    db.getSingleTopic(idInt, function(results) {
      if (results)
      {res.json(results);}
      else res.status(404).send();
    });
  })
  .delete(function(req, res) {
    db.removeTopic(req, res, function() {});
  })
  .put(function(req, res) {
    db.updateTopic(req, res, function() {
      res.status(200).end();
    });
  });
// router.route("/:id/comments").get(function(req, res) {
//   db.getAllComments(req.params.id, function(results) {
//     res.send(results);
//   });
// });

module.exports = router;
