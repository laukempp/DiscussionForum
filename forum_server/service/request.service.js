const url = '/api/topics';
const Pool = require('pg').Pool;
const config = require('./config');

const pool = new Pool(config.conopts);

// Get all topics from database
function getAllTopics(callback) {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('SELECT * FROM topic', (err, data) => {
                if (err) throw err;
                client.release();
                callback(data.rows);
            });
    });
}
// Get single topic from database
function getSingleTopic(req, callback) {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('SELECT * FROM topic where id = $1', [req.params.id], (err, data) => {
                if (err) throw err;
                client.release();
                callback(data.rows);
            });
    });
}
//Creating topic
function createTopic(req, callback) {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('INSERT INTO topic(nickname, title, comment) VALUES($1, $2, $3)',
                [req.body.nickname, req.body.title, req.body.comment], (err, data) => {
            if (err) throw err;
            client.release();
            callback();
        });
    });
}
//Removing topic based on id
function removeTopic(req, res, callback) {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('DELETE FROM topic WHERE id = $1',
            [parseInt(req.params.id)], (err, data) => {
                if (err) throw err;
                client.release();
                // kerrotaan että onnistui
                res.status(202)
                    .json({
                        status: 'Onnistui',
                        message: 'Poistettiin topic.'
                    });
                callback();
            });
    });
}
// Updating topic based on id
function updateTopic(req, res, callback) {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('UPDATE topic SET nickname = $1, title = $2, comment = $3 WHERE id = $4',
            [req.body.nickname, req.body.title, req.body.comment, parseInt(req.params.id)], (err, data) => {
                if (err) throw err;
                client.release();
                res.json(req.body)
                callback(res.body);
            });
    });
}
    module.exports = {getAllTopics, getSingleTopic, createTopic, removeTopic, updateTopic};