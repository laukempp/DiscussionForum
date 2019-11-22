/* const url = '/api/topics'; */
const Pool = require("pg").Pool;
const config = require("./config");

const pool = new Pool(config.conopts);

// Get all topics from database
function getAllTopics(callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query("SELECT * FROM topic", (err, data) => {
      if (err) throw err;
      client.release();
      callback(data.rows);
    });
  });
}
// Get single topic from database
function getSingleTopic(id, callback) {
  console.log(id)
  pool.connect((err, client) => {
    if (err) throw err;
    client.query(
      "SELECT * FROM topic where id = $1",
      [id],
      (err, data) => {
        if (err) throw err;
        client.release();
        callback(data.rows[0]);
      }
    );
  });
}
//Creating topic
function createTopic(req, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query(
      "INSERT INTO topic(nickname, title, input) VALUES($1, $2, $3)",
      [req.body.nickname, req.body.title, req.body.input],
      (err, data) => {
        if (err) throw err;
        client.release();
        callback();
      }
    );
  });
}
//Removing topic based on id
function removeTopic(req, res, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query(
      "DELETE FROM topic WHERE id = $1",
      [parseInt(req.params.id)],
      (err, data) => {
        if (err) throw err;
        client.release();
        // kerrotaan että onnistui
        res.status(202).json({
          status: "Onnistui",
          message: "Poistettiin topic."
        });
        callback();
      }
    );
  });
}
// Updating topic based on id
function updateTopic(req, res, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query(
      "UPDATE topic SET nickname = $1, title = $2, input = $3 WHERE id = $4",
      [
        req.body.nickname,
        req.body.title,
        req.body.input,
        parseInt(req.params.id)
      ],
      (err, data) => {
        if (err) throw err;
        client.release();
        res.json(req.body);
        callback(res.body);
      }
    );
  });
}

// Connecting to table comments

function getAllComments(topic_id, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query(
      "SELECT * FROM comment WHERE topic_id = $1",
      [topic_id],
      (err, data) => {
        if (err) throw err;
        console.log("All", topic_id, data.rows);
        client.release();
        callback(data.rows);
      }
    );
  });
}
// Get single comment from database
function getSingleComment(id, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query("SELECT * FROM comment where id = $1", [id], (err, data) => {
      if (err) throw err;
      client.release();
      console.log(data.rows);
      callback(data.rows[0]);
    });
  });
}
//Creating a comment
function createComment(req, callback) {
  console.log("POSTATAAN", req.body, req.params.id);
  pool.connect((err, client) => {
    if (err) throw err;
    client.query(
      "INSERT INTO comment(topic_id, input, c_nickname) VALUES($1, $2, $3)",
      [req.params.id, req.body.input, req.body.c_nickname],
      (err, data) => {
        if (err) throw err;
        client.release();
        callback();
      }
    );
  });
}
//Removing comment based on id
function removeComment(req, res, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query(
      "DELETE FROM comment WHERE id = $1",
      [parseInt(req.params.id)],
      (err, data) => {
        if (err) throw err;
        client.release();
        // kerrotaan että onnistui
        res.status(202).json({
          status: "Onnistui",
          message: "Poistettiin kommentti."
        });
        callback();
      }
    );
  });
}
// Updating comment based on id
function updateComment(req, res, callback) {
  pool.connect((err, client) => {
    if (err) throw err;
    client.query(
      "UPDATE comment SET c_nickname = $1, input = $2, topic_id = $3 WHERE id = $4",
      [
        req.body.c_nickname,
        req.body.input,
        req.body.topic_id,
        parseInt(req.params.id)
      ],
      (err, data) => {
        if (err) throw err;
        client.release();
        res.json(req.body);
        callback(data.rows[0]);
      }
    );
  });
}

module.exports = {
  getAllTopics,
  getSingleTopic,
  createTopic,
  removeTopic,
  updateTopic,
  getAllComments,
  getSingleComment,
  createComment,
  removeComment,
  updateComment
};
