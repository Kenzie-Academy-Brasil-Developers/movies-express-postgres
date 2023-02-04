create database db_movies;

create table if not exists todos (
id bigserial primary key,
name varchar(50) unique not null,
description text not null,
duration int not null,
price int not null
)

select * from todos

insert into
todos(name, description, duration, price)
values
('O Rei Leão', 'Infantil', 90, 60)