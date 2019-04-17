
drop table if exists user_genre;
drop table if exists user_profession;
drop table if exists user_video;
drop table if exists band_genre;
drop table if exists private_messages;
drop table if exists advert;
drop table if exists user_band;
drop table if exists users;
drop table if exists role;
drop table if exists band;
drop table if exists genre;
drop table if exists profession;
drop table if exists videos;
drop table if exists city;

create table city (
    city_id serial primary key,
    name VARCHAR(50) not null
)

create table role (
    role_id serial primary key,
    name VARCHAR(20) not null
);

create table band (
    band_id serial primary key,
    name varchar(50) not null,
    city_id integer references city(city_id),
    year_founded date,
    photo varchar(255) default 'random_band.png',
    homepage varchar(100),
    description text
);

create table users (
    user_id serial primary key,
    role_id integer references role(role_id) on delete cascade default 1,
    first_name varchar(40),
    last_name varchar(50),
    nickname varchar(30),
    email varchar(100) unique not null,
    password varchar(100) not null,
    city_id integer references city(city_id),
    photo_url varchar(255) default 'random_photo.png',
    description text
);

create table private_messages (
    msg_id serial primary key,
    user_to integer references users (user_id) on delete cascade,
    user_from integer references users (user_id) on delete cascade,
    sent_time timestamp ,
    title varchar(100),
    body text,
    read boolean default false
);

create table profession (
    prof_id serial primary key,
    name varchar(50) not null
);

create table genre (
    genre_id serial primary key,
    name varchar(50) not null
);

create table advert (
    advert_id serial primary key,
    user_id integer references users(user_id) on delete cascade not null ,
    band_id integer references band(band_id) on delete cascade,
    title varchar(100) not null,
    description text not null,
    posted_on timestamp not null default now(),
    profession_id integer references profession(prof_id) on delete cascade not null,
    genre_id integer references genre(genre_id) on delete cascade
);

create table videos (
    video_id serial primary key,
    url varchar(255) not null
);

create table user_profession (
    user_id integer references users(user_id) on delete cascade,
    prof_id integer references profession(prof_id) on delete cascade
);

create table user_band (
    user_id integer references users(user_id) on delete cascade,
    band_id integer references band(band_id) on delete cascade
);

create table user_genre (
    user_id integer references users(user_id) on delete cascade,
    genre_id integer references genre(genre_id) on delete cascade
);

create table user_video (
    user_id integer references users(user_id) on delete cascade,
    video_id integer references videos(video_id) on delete cascade
);

create table band_genre (
    band_id integer references band(band_id) on delete cascade,
    genre_id integer references genre(genre_id) on delete cascade
);

insert into role (name) values ('USER');
insert into role (name) values ('ADMIN');

insert into profession (name) values ('Electric Guitar');
insert into profession (name) values ('Electric Bass');
insert into profession (name) values ('Piano');
insert into profession (name) values ('Drums');
insert into profession (name) values ('Keyboards');
insert into profession (name) values ('Flute');
insert into profession (name) values ('Classical Guitar');
insert into profession (name) values ('Violin');
insert into profession (name) values ('Saxophone');
insert into profession (name) values ('Vocal');

insert into genre (name) values ('Hard Rock');
insert into genre (name) values ('EDM');
insert into genre (name) values ('Jazz');
insert into genre (name) values ('Dub step');
insert into genre (name) values ('Pop');
insert into genre (name) values ('Folk');
insert into genre (name) values ('Indie Rock');
insert into genre (name) values ('Punk');
insert into genre (name) values ('Metal');
insert into genre (name) values ('Blues');
insert into genre (name) values ('Country');
insert into genre (name) values ('Hip-hop');
insert into genre (name) values ('RnB');