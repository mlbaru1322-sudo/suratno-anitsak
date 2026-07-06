-- One-time cleanup for the public wedding guestbook.
-- This targets only the table used by the public Ucapan Tamu list.

select count(*) as before_count
from public.wedding_wishes;

delete from public.wedding_wishes;

select count(*) as after_count
from public.wedding_wishes;
