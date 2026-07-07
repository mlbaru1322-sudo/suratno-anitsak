# Wedding Wishes Redesign Report

## Previous Public Flow

The public form was an RSVP-style form with:

- guest name,
- attendance status,
- guest count,
- optional message.

Submission used `submitWeddingWish()` and inserted into `public.wedding_wishes`. The public wishes list used `getApprovedWishes()` from the same table.

## New Public Form

The public section is now a wedding guestbook form named `Ucapan & Doa`.

Final fields:

- `Nama Tamu`
- `Ucapan & Doa`

Submit button:

- `Kirim Ucapan`

The form preserves the existing guest-name behavior by prefilling from invitation data when a specific guest name is available, while still allowing edits.

## Removed RSVP Fields

Removed from public UI:

- RSVP title/copy,
- attendance selector,
- `Hadir`,
- `Tidak Hadir`,
- `Masih Ragu`,
- guest count,
- public attendance badges.

## Submission Data Flow

Current flow:

```text
RsvpSection
-> submitWeddingWish({ guest_name, message })
-> public.wedding_wishes
-> getApprovedWishes()
-> WishesSection
```

The existing legacy columns remain in the table for compatibility:

- `attendance_status`
- `guest_count`

The public form does not send fake attendance data. `guest_count` is omitted so the database default can apply.

## Wishes Carousel

`WishesSection` is now a manual horizontal scroll-snap guestbook carousel.

- No autoplay.
- Real wishes only.
- Message and guest name are displayed.
- Attendance status and guest count are not displayed.
- Pagination uses an editorial page number when there is more than one page.

## Premium Guestbook Page Refinement

Previous visual issue:

- Each wish was rendered as its own rounded bordered card inside the larger section surface.
- The result felt like a database/comment list rather than a wedding guestbook page.

New structure:

- One swipe slide is one shared guestbook paper page.
- Each page contains up to four wishes.
- Wishes are plain entries on the same paper surface, separated by subtle antique-gold hairlines.
- The small diamond divider appears once at the top of each page.
- Quote mark decorations were removed from the wishes display.
- Guest names are now quieter signature text aligned to the lower-right of each wish.
- The carousel dots were replaced by an editorial page counter such as `01 / 03`.
- Mobile safe space was added on the right side of the page content to reduce overlap risk from floating controls.

## Alternating Premium Wish Cards

The one-page guestbook structure was changed again because the wishes felt too merged together on one shared paper surface.

New structure:

- Each wish is rendered as its own premium ivory card.
- Each swipe page still contains up to four wishes.
- Cards are stacked in one vertical column, not a grid.
- Cards alternate subtly left and right for editorial rhythm.
- No quote mark decorations are rendered.
- Attendance badges remain removed.
- Pagination uses small centered dots instead of page numbers.
- Mobile safe spacing remains on the right side so floating controls do not cover the card content or dots.

## Four-Wish Page Behavior

Wishes are chunked into pages of 4:

- wishes 1-4: page 1,
- wishes 5-8: page 2,
- wishes 9-12: page 3.

One manual swipe moves one full page group, not a single card.

## Empty State

Zero-wish state:

`Belum ada ucapan. Jadilah yang pertama mengirim doa terbaik.`

Loading and error states remain neutral and do not show dummy testimonials.

## Previous Data Cleanup

Confirmed table:

`public.wedding_wishes`

Before row count:

`NOT AVAILABLE`

After row count:

`NOT VERIFIED`

Live deletion performed:

`NO`

Manual SQL required:

`YES`

SQL file:

`supabase/clear-existing-wedding-wishes.sql`

The SQL file targets only `public.wedding_wishes` and includes before/after count queries.

## Files Changed

- `components/wedding/rsvp-section.tsx` - changed public RSVP into `Ucapan & Doa` guestbook form.
- `components/wedding/wishes-section.tsx` - added 4-wish manual swipe pages and removed attendance badges.
- `components/wedding/invitation-page.tsx` - passes public data into the guestbook form for guest-name prefill.
- `lib/services/wedding-service.ts` - makes legacy RSVP fields optional and submits only real wish data from the public form.
- `supabase/schema.sql` - removes dummy seed wishes.
- `supabase/clear-existing-wedding-wishes.sql` - one-time manual cleanup SQL for existing rows.

## Validation

Typecheck:

`PASS`

Command:

```text
node_modules\.bin\tsc.cmd --noEmit --incremental false
```

Build:

`PASS`

Command:

```text
npm run build
```
