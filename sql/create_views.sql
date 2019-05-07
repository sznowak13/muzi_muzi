drop view if exists user_messages_view;
drop view if exists band_members_view;
drop view if exists advert_view;
drop view if exists user_list_view;
drop view if exists user_profile_view;
drop view if exists advert_list_view;

create view user_messages_view as (
    with emails_to as (
        select email as email_to, title
        from private_messages pm
                 join users u on pm.user_to = u.user_id
    ),
         emails_from as (
             select email as email_from, title
             from private_messages pm
                      join users u3 on pm.user_from = u3.user_id
         )

    select email_from, email_to, pm.title, pm.msg_id message, pm.read
    from private_messages pm,
         emails_from,
         emails_to
);

create view band_members_view as
select b.name, string_agg(u.first_name || ' ' || u.last_name, ', ') as members
from band b
         join user_band ub on b.band_id = ub.band_id
         join users u on ub.user_id = u.user_id
group by b.band_id;

create view advert_view as (
    select first_name,
           c.name     city,
           a.title,
           a.description,
           g.name     genre,
           p.name     profession,
           case
               when a.band_id is not null then (
                   select b.name
                   from band b
                            join advert a2 on b.band_id = a2.band_id
               )
               else null
               end as band_name
    from users
             join advert a on users.user_id = a.user_id
             join profession p on a.profession_id = p.prof_id
             join genre g on a.genre_id = g.genre_id
             join city c on users.city_id = c.city_id
);

create view advert_list_view as (
    select case
               when a.band_id is not null then 'band advert'
               else 'musician advert'
               end as advert_type,
           first_name,
           c.name     city,
           a.title,
           a.posted_on,
           g.name     ganre,
           p.name     profession,
           case
               when a.band_id is not null then (
                   select b.name
                   from band b
                            join advert a2 on b.band_id = a2.band_id
               )
               else null
               end as band_name
    from users
             join advert a on users.user_id = a.user_id
             join profession p on a.profession_id = p.prof_id
             join genre g on a.genre_id = g.genre_id
             join city c on users.city_id = c.city_id
);

create view user_list_view as (
    select u.user_id,
           u.first_name,
           u.email,
           u.photo_url,
           c.name                               city,
           string_agg(distinct p.name, ', ') as prof,
           string_agg(distinct g.name, ', ') as genre
    from users u
             join city c on u.city_id = c.city_id
             join user_profession up on u.user_id = up.user_id
             join profession p on up.prof_id = p.prof_id
             join user_genre ug on u.user_id = ug.user_id
             join genre g on ug.genre_id = g.genre_id
    group by u.first_name, u.email, u.photo_url, c.name, u.user_id
);

create view user_profile_view as (
    select u.user_id,
           u.first_name,
           u.last_name,
           u.nickname,
           u.email,
           u.description,
           u.photo_url                          photo,
           c.name                               city,
           (select v.url from videos v where u.video_id = v.video_id)
           video,
           string_agg(distinct p.name, ', ') as prof,
           string_agg(distinct g.name, ', ') as genre,
           (select string_agg(b.name, ', ')
                     from band b
                              join user_band ub on b.band_id = ub.band_id
                     where ub.user_id = u.user_id)                      as bands
    from users u
             join city c on u.city_id = c.city_id
             join user_profession up on u.user_id = up.user_id
             join profession p on up.prof_id = p.prof_id
             join user_genre ug on u.user_id = ug.user_id
             join genre g on ug.genre_id = g.genre_id
    group by u.user_id, u.first_name, u.email, u.photo_url, c.name, video
);