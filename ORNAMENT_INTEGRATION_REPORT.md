# Ornament Integration Report

## Assets Used

- Left ornament: `public/ornaments/gambar-1-ornamen-kiri-transparent.png`
- Right ornament: `public/ornaments/gambar-1-ornamen-kanan-transparent.png`
- Divider: `public/ornaments/gambar-2-garis-pembatas-transparent.png`

Asset inspection:

- Left ornament: 635x940 PNG, transparent background.
- Right ornament: 632x940 PNG, transparent background.
- Divider: 2172x724 PNG, transparent background.

## Placements

### Greeting Section

Asset:
Left ornament

Position:
Partially entering from the upper-left section edge behind the greeting card.

Reason:
Fills the quiet opening content area without covering text or buttons.

### Greeting Section

Asset:
Right ornament

Position:
Partially entering from the lower-right section edge behind the greeting card.

Reason:
Balances the left ornament and gives the first content section a richer Java vintage frame.

### Event Section

Asset:
Right ornament

Position:
Upper-right background, partially clipped by the section edge.

Reason:
Uses the empty side area beside centered event content while staying behind text and action buttons.

### Digital Gift Section

Asset:
Left ornament

Position:
Lower-left background, partially entering from the section edge.

Reason:
Softens the empty ivory background around the gift cards without blocking copy or copy buttons.

### Couple To Countdown Transition

Asset:
Divider

Position:
Centered between the Mempelai section and Countdown section.

Reason:
Adds a gentle transition after the main couple card.

### Love Story To Gallery Transition

Asset:
Divider

Position:
Centered between the Love Story section and Gallery section.

Reason:
Connects two visually different sections without adding another heavy block.

### Wishes To Digital Gift Transition

Asset:
Divider

Position:
Centered between the Wishes section and Digital Gift section.

Reason:
Introduces the gift section with a subtle ornamental separator.

## Mobile Behavior

Side ornaments use responsive widths and are partially offset from the viewport edge. Parent sections use `overflow-hidden`, so the ornaments cannot create horizontal scrolling. Content wrappers remain above the ornaments with `z-10`.

The divider uses a constrained responsive width: `min(78vw, 21rem)` on mobile and a slightly larger width on larger screens.

## Interaction Safety

All ornament images are decorative:

- `aria-hidden="true"`
- `alt=""`
- `pointer-events-none`
- `select-none`

They sit behind content and do not block links, buttons, form fields, gallery images, or lightbox controls.

The fullscreen gallery lightbox remains above ornaments because its portal overlay uses a much higher z-index than decorative elements.

## Files Changed

- `components/wedding/ornaments.tsx` - added small reusable ornament helpers using the three PNG assets.
- `components/wedding/greeting-section.tsx` - added left and right background ornaments.
- `components/wedding/event-section.tsx` - added right background ornament.
- `components/wedding/digital-gift-section.tsx` - added left background ornament.
- `components/wedding/invitation-page.tsx` - added three selected divider placements between major sections.

## Validation

Typecheck:
PASS

Build:
PASS

Source verification:
PASS

- Left ornament is used.
- Right ornament is used.
- Divider is used.
- Decorative images use `pointer-events-none`.
- No backend, admin, Supabase, auth, gallery logic, RSVP behavior, or lightbox logic was changed.

## Remaining Visual Concerns

NONE known from source validation and build. Final visual review on mobile is still recommended because browser automation was unavailable in this environment.
