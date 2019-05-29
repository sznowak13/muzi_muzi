drop view if exists user_messages_view;
drop view if exists band_members_view;
drop view if exists advert_view;
drop view if exists user_list_view;
drop view if exists user_profile_view;
drop view if exists advert_list_view;

drop table if exists users_genres;
drop table if exists users_professions;
drop table if exists bands_genres;
drop table if exists private_messages;
drop table if exists advert;
drop table if exists users_bands;
drop table if exists users;
drop table if exists role;
drop table if exists band;
drop table if exists genre;
drop table if exists profession;
drop table if exists city;
drop table if exists videos;

create table city (
    city_id serial primary key default 0,
    name VARCHAR(50) not null
);

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

create index on band (city_id);

create table videos (
    video_id serial primary key,
    url varchar(255) not null
);

create table users (
    user_id serial primary key,
    role_id integer references role(role_id) on delete cascade default 1,
    first_name varchar(40),
    last_name varchar(50),
    username varchar(30),
    email varchar(100) unique not null,
    password varchar(100) not null,
    city_id integer references city(city_id),
    photo_url varchar(255) default 'random_photo.png',
    video_id integer references videos (video_id) on delete cascade,
    description text
);

create index on users (role_id);
create index on users (city_id);

create table private_messages (
    msg_id serial primary key,
    user_to integer references users (user_id) on delete cascade,
    user_from integer references users (user_id) on delete cascade,
    sent_time timestamp ,
    title varchar(100),
    body text,
    read boolean default false
);

create index on private_messages (user_to);
create index on private_messages (user_from);

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

create index on advert (user_id);
create index on advert (band_id);
create index on advert (profession_id);
create index on advert (genre_id);

create table users_professions (
    user_id integer references users(user_id) on delete cascade,
    prof_id integer references profession(prof_id) on delete cascade
);

create index on users_professions (user_id);
create index on users_professions (prof_id);

create table users_bands (
    user_id integer references users(user_id) on delete cascade,
    band_id integer references band(band_id) on delete cascade
);

create index on users_bands (user_id);
create index on users_bands (band_id);

create table users_genres (
    user_id integer references users(user_id) on delete cascade,
    genre_id integer references genre(genre_id) on delete cascade
);

create index on users_genres (user_id);
create index on users_genres (genre_id);

create table bands_genres (
    band_id integer references band(band_id) on delete cascade,
    genre_id integer references genre(genre_id) on delete cascade
);

create index on bands_genres (band_id);
create index on bands_genres (genre_id);

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