drop view if exists user_messages;
drop view if exists band_members;
drop view if exists advert_data;

create view user_messages as (
with emails_to as (
    select email as email_to, title from private_messages pm
    join users u on pm.user_to = u.user_id
), emails_from as (
    select email as email_from, title from private_messages pm
    join users u3 on pm.user_from = u3.user_id
)

select email_from, email_to, pm.title
from private_messages pm, emails_from, emails_to
);

create view band_members as
select b.name, string_agg(u.first_name || ' ' || u.last_name, ', ') as members from band b
join user_band ub on b.band_id = ub.band_id
join users u on ub.user_id = u.user_id
group by b.band_id;

create view advert_data as (select first_name, c.name, a.title,
a.description, g.name ganre, p.name profession,
case when a.band_id is not null then (
    select b.name from band b join advert a2 on b.band_id = a2.band_id
    ) else '---'
end as band_name
from users
join advert a on users.user_id = a.user_id
join profession p on a.profession_id = p.prof_id
join genre g on a.genre_id = g.genre_id
join city c on users.city_id = c.city_id);
