-- CREATE DATABASE forum;

-- \c forum;

CREATE TABLE comment(
    id SERIAL PRIMARY KEY,
    title text,
    input VARCHAR(5000),
    UNIQUE(title)
);
CREATE TABLE topic(
    topic_id SERIAL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    title VARCHAR(255) REFERENCES comment(title) NOT NULL,
    posttime TIMESTAMP);


/* INSERT INTO topic(nickname, title, comment) VALUES('testinimi', 'testiotsikko', 'testitestitesti'); */