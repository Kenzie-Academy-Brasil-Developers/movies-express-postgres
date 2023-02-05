create database db_movies;

create table if not exists movies (
id bigserial primary key,
name varchar(50) unique not null,
description text not null,
duration int not null,
price int not null
)

select * from movies

insert into
movies(name, description, duration, price)
values
('O Rei Leão', 'Infantil', 90, 60)