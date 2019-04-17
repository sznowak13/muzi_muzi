drop view if exists user_messages;
drop view if exists band_members;

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