INSERT INTO
   "movies" ("name", "description", "duration", "price")
VALUES
   ('O Rei Leão', 'Infantil', 120, 30),
   ('Cinderela', 'Princesa', 90, 20),
   ('Carros', 'Infantil', 83, 10),
   ('Lagoa azul', 'Romance', 105, 15),
   ('Avatar', 'Ficção', 90, 40)
RETURNING *;