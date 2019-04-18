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
           c.name city,
           a.title,
           a.description,
           g.name     ganre,
           p.name     profession,
           case
               when a.band_id is not null then (
                   select b.name
                   from band b
                            join advert a2 on b.band_id = a2.band_id
               )
               else '---'
               end as band_name
    from users
             join advert a on users.user_id = a.user_id
             join profession p on a.profession_id = p.prof_id
             join genre g on a.genre_id = g.genre_id
             join city c on users.city_id = c.city_id
);

create view advert_list_view as (
     select case when a.band_id is not null then 'band advert'
           else 'musician advert'
           end as advert_type,
           first_name,
           c.name city,
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
               else '---'
               end as band_name
    from users
             join advert a on users.user_id = a.user_id
             join profession p on a.profession_id = p.prof_id
             join genre g on a.genre_id = g.genre_id
             join city c on users.city_id = c.city_id
);

create view user_list_view as (
    with user_proffesions as (
        select u2.user_id as id, string_agg(p2.name, ', ') as prof
        from profession p2
                 join user_profession up2 on p2.prof_id = up2.prof_id
                 join users u2 on up2.user_id = u2.user_id
        group by u2.user_id
    ),
         user_genres as (
             select u3.user_id as id, string_agg(g2.name, ', ') as genres
             from genre g2
                      join user_genre ug2 on g2.genre_id = ug2.genre_id
                      join users u3 on ug2.user_id = u3.user_id
             group by u3.user_id
         )

    select u.user_id,
           u.first_name,
           u.email,
           u.photo_url,
           c.name                    city,
           (select prof
            from user_proffesions
            where u.user_id = id) as profession,
           (select genres
            from user_genres
            where u.user_id = id) as genre
    from users u
             join city c on u.city_id = c.city_id
    group by u.first_name, u.email, u.photo_url, c.name, u.user_id
);

create view user_profile_view as (
        with user_proffesions as (
        select u2.user_id as id, string_agg(p2.name, ', ') as prof
        from profession p2
                 join user_profession up2 on p2.prof_id = up2.prof_id
                 join users u2 on up2.user_id = u2.user_id
        group by u2.user_id
    ),
         user_genres as (
             select u3.user_id as id, string_agg(g2.name, ', ') as genres
             from genre g2
                      join user_genre ug2 on g2.genre_id = ug2.genre_id
                      join users u3 on ug2.user_id = u3.user_id
             group by u3.user_id
         ),
         user_bands as (
             select u4.user_id as id, string_agg(b2.name, ', ') as bands
             from band b2
             join user_band ub2 on b2.band_id = ub2.band_id
             join users u4 on ub2.user_id = u4.user_id
             group by u4.user_id
         ),
         user_video as (
             select u5.user_id as id, v.url as video
             from videos v
             join users u5 on u5.video_id = v.video_id
         )
    select u.user_id,
           u.first_name,
           u.last_name,
           u.nickname,
           u.email,
           u.description,
           u.photo_url,
           c.name                    city,
           (select prof
            from user_proffesions
            where u.user_id = id) as profession,
           (select genres
            from user_genres
            where u.user_id = id) as genre,
        (select bands from user_bands
        where  u.user_id = id) as bands,
        (select video from user_video
        where u.user_id = id) as video
    from users u
             join city c on u.city_id = c.city_id
    group by u.first_name, u.email, u.photo_url, c.name, u.user_id
)