-- CREATE DATABASE forum;

-- \c forum;
CREATE TABLE topic(
id SERIAL PRIMARY KEY,
nickname VARCHAR(255) NOT NULL,
title VARCHAR(255),
input text,
posttime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE comment(
    id SERIAL PRIMARY KEY,
    input text,
    topic_id int REFERENCES topic(id),
    img bytea,
    c_nickname varchar(255) NOT NULL,
    c_posttime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO topic(nickname, title) VALUES('testinimi', 'testiotsikko');
