CREATE DATABASE db_movies;

CREATE TABLE if NOT EXISTS "movies" (
     "id" BIGSERIAL PRIMARY KEY,
     "name" VARCHAR(50) UNIQUE NOT NULL,
     "description" TEXT,
     "duration" INT NOT NULL,
     "price" INT NOT NULL
)


