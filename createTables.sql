CREATE DATABASE db_movies;

CREATE TABLE if NOT EXISTS movies (
id BIGSERIAL PRIMARY KEY,
name VARCHAR(50) UNIQUE NOT NULL,
description TEXT NOT NULL,
duration INT NOT NULL,
price INT NOT NULL
)

SELECT * FROM movies

INSERT INTO
movies(name, description, duration, price)
VALUES
('O Rei Leão', 'Infantil', 90, 60)