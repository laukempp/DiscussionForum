/* CREATE DATABASE forum;

\c forum;

CREATE TABLE topic(
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    comment VARCHAR(5000),
    posttime TIMESTAMP); */

INSERT INTO topic(nickname, title, comment) VALUES('testinimi', 'testiotsikko', 'testitestitesti');