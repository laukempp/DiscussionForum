const url = '/api/topics';
const Pool = require('pg').Pool;
const config = require('./config');

const pool = new Pool(config.conopts);
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
function updateTopic(req, callback) {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('UPDATE topic SET nickname = $1, title = $2, comment = $3 WHERE id = $4',
            [req.body.nickname, req.body.title, req.body.comment, parseInt(req.params.id)], (err, data) => {
                if (err) throw err;
                client.release();
                callback();
            });
    });
}
    module.exports = {getAllTopics, getSingleTopic, createTopic, removeTopic, updateTopic};