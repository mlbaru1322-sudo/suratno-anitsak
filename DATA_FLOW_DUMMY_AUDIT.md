# Data Flow and Dummy Data Audit

## 1. Executive Summary

- Old data appears first because `InvitationPage` renders `getFallbackWeddingData(null)` immediately, then reads the guest query and renders `getFallbackWeddingData(queryGuestName)`, then only after that starts the client-side Supabase fetch and replaces part of the data with `mergeSupabaseWeddingData(...)`.
- Confirmed category: **STATIC FALLBACK FLASH** plus **CLIENT FETCH DELAY**. Cache and hydration mismatch were not confirmed as the root cause.
- Active runtime data sources on the public invitation: **4**:
  1. `lib/wedding-data.ts` static fallback/dummy wedding data.
  2. Supabase public reads for `wedding_settings` and `wedding_events`.
  3. Local component constants/assets for quote, hero slider, gallery, gift, love story, music, and UI copy.
  4. Supabase wishes read/write through `wedding_wishes`, with static dummy fallback in the wishes UI.
- Public sections still using dummy/static wedding-specific data: **8 section areas**: Quote, Couple photos, Hero slider photos, Love Story, Gallery, Digital Gift, Wishes fallback/initial state, Floating Music.

## 2. Public Page Data Flow

Actual public route flow:

```text
app/page.tsx
-> <InvitationPage />
-> useState(() => getFallbackWeddingData(null))
-> render sections with publicData
-> useEffect reads window.location.search ?to=
-> setGuestName(queryGuestName)
-> setData(getFallbackWeddingData(queryGuestName))
-> Promise.all([getWeddingSettings(), getWeddingEvents()])
-> Supabase browser client
-> wedding_settings + wedding_events
-> mergeSupabaseWeddingData({ settings, events, guestName })
-> setData(mergedData)
-> render sections again with publicData
```

Important split:

- `InvitationPage` passes `publicData` to Opening, Hero, Greeting, Quote, Couple, Countdown, Event, Maps, Closing, and FloatingMusicButton.
- `LoveStorySection`, `GallerySection`, `RsvpSection`, `WishesSection`, and `DigitalGiftSection` do not receive the final `publicData` object.
- Some components receive `data` but still ignore or partially bypass it.

## 3. Initial Load Root Cause

Exact file:

- `components/wedding/invitation-page.tsx`

Exact code path:

- `useState<WeddingData>(() => getFallbackWeddingData(null))`
- `useEffect(() => { ... setData(getFallbackWeddingData(queryGuestName)) ... void loadSupabaseData() }, [])`
- `loadSupabaseData()` calls `getWeddingSettings()` and `getWeddingEvents()`
- after both finish, `setData(mergeSupabaseWeddingData(...))`

Exact old data source:

- `lib/wedding-data.ts`

Exact trigger:

- First client render uses static fallback data before Supabase data is available.
- The same fallback is set again after reading `?to=` from the URL.
- If Supabase is missing, errors, unpublished, or empty, fallback remains visible.

## 4. Initial Render Timeline

T0:

`app/page.tsx` renders `<InvitationPage />`. Because the component is client-side, the first visible data state is initialized from `getFallbackWeddingData(null)`.

T1:

Sections render using `publicData`, which currently equals the fallback object from `lib/wedding-data.ts`.

T2:

`useEffect` runs in the browser, reads `window.location.search`, extracts `?to=`, then calls `setGuestName(queryGuestName)` and `setData(getFallbackWeddingData(queryGuestName))`.

T3:

The browser starts Supabase reads through `getWeddingSettings()` and `getWeddingEvents()`.

T4:

When Supabase returns, `mergeSupabaseWeddingData(...)` overlays selected Supabase fields on top of `weddingData`.

T5:

Sections that consume `publicData` re-render with the merged result. Sections that import local/static data directly do not change.

## 5. Data Source Matrix

| Section | Field | Source | Status |
|---|---|---|---|
| Opening / Cover | couple short name | MIXED | Fallback first, then Supabase names can override through `publicData.coupleShort`. |
| Opening / Cover | guest name | MIXED | Query param overrides fallback guest name; fallback is `Bapak Hadi Sekeluarga`. |
| Opening / Cover | background/gapura/wayang assets | LOCAL HARDCODED | UI assets, not necessarily wedding data. |
| Hero | couple short names/date | MIXED | Receives `publicData`; fallback first, Supabase can override names/date. |
| Hero | slider photos | LOCAL HARDCODED | Uses local `HERO_SLIDER_PHOTOS`, not Supabase gallery/final data. |
| Greeting | opening/message | MIXED | Receives `publicData`; Supabase settings can override title/body through mapper. |
| Quote | quote label/text/source | LOCAL HARDCODED | Receives `data` prop but ignores it and renders local constants. |
| Couple / Mempelai | names/parents/social links | MIXED | Receives `data`; names can be Supabase, parents/social remain static from fallback. |
| Couple / Mempelai | bride/groom photos | STATIC WEDDING DATA | Explicitly uses `weddingData.bride.photo` and `weddingData.groom.photo`, bypassing Supabase photo URLs. |
| Countdown | wedding date | MIXED | Receives `publicData`; fallback first, Supabase setting can override date. |
| Event | event title/date/time/venue/address/maps URL | MIXED | Receives mapped events from Supabase, but if events are empty or individual fields are empty, static fallback values remain. |
| Maps | primary label/url | MIXED | Receives mapped `publicData.maps`; can fall back to static map label/url. UI map itself is a visual placeholder. |
| Love Story | timeline items | STATIC WEDDING DATA | Imports `weddingData.loveStory` directly; does not use Supabase `wedding_love_stories`. |
| Gallery | image list/order/alt | LOCAL HARDCODED | Uses local `galleryFiles` array under `/images/optimized/galery/`; does not use `weddingData.gallery` or Supabase `wedding_gallery`. |
| RSVP | labels/guest count options | LOCAL HARDCODED | Form UI copy is local. Submission writes to Supabase `wedding_wishes`. |
| Wishes | displayed wishes | DUMMY / PLACEHOLDER + SUPABASE | Initial state is dummy wishes from `weddingData.wishes`; after opening, approved Supabase wishes can replace them. Empty/error/unconfigured Supabase shows dummy wishes. |
| Digital Gift | bank name/account/account holder | STATIC WEDDING DATA | Imports `weddingData.gifts` directly; does not use Supabase `wedding_bank_accounts`. |
| Closing | closing text/couple/date/photo | MIXED | Receives `publicData`, but mapper does not override closing text or closing photo, so these remain fallback/static. |
| Floating Music | audio source | LOCAL HARDCODED | `data?: WeddingData` prop exists, but audio source is fixed to `/music/music.mp3`. |
| Back To Top | visibility/button | LOCAL HARDCODED | UI-only; no wedding data. |

## 6. Remaining Dummy / Hardcoded Data

Confirmed active wedding-specific static or dummy items:

- `lib/wedding-data.ts`: central fallback object, explicitly commented as dummy content.
- `lib/wedding-data.ts`: fallback guest `Bapak Hadi Sekeluarga`.
- `lib/wedding-data.ts`: fallback venues `Masjid Agung Al-Falah` and `Ballroom Hotel Aston`.
- `lib/wedding-data.ts`: fallback maps URL `https://maps.google.com`.
- `lib/wedding-data.ts`: fallback gallery array `/images/optimized/gallery-1.webp` through `/images/optimized/gallery-8.webp`; active as data object, though current gallery component does not render it.
- `lib/wedding-data.ts`: dummy wishes `Andi Pratama`, `Siti Nurhaliza`, `Budi Santoso`, `Dewi Lestari`.
- `lib/wedding-data.ts`: gift accounts `Bank BCA 1234567890` and `Bank Mandiri 0987654321`.
- `components/wedding/quote-section.tsx`: quote constants ignore `data.quote`.
- `components/wedding/couple-section.tsx`: bride/groom photos read from imported `weddingData`, not `data`.
- `components/wedding/love-story-section.tsx`: love story reads imported `weddingData.loveStory`.
- `components/wedding/gallery-section.tsx`: hardcoded optimized gallery file list.
- `components/wedding/digital-gift-section.tsx`: gifts read imported `weddingData.gifts`.
- `components/wedding/wishes-section.tsx`: dummy wishes are the initial and fallback display.
- `components/wedding/floating-music-button.tsx`: audio source is hardcoded to `/music/music.mp3`.
- `supabase/schema.sql`: seed data contains old venue/gallery/love story/bank/wish/guest values and can repopulate old data if run.

Intentional UI copy separated from wedding data:

- Button labels, form placeholders, RSVP attendance labels, section headings, and accessibility labels are local UI copy. These are not automatically problems unless the project wants all copy admin-managed.

## 7. Old Data Still Present

| Old Value | File | Used By | Visible During Initial Load |
|---|---|---|---|
| `Bapak Hadi Sekeluarga` | `lib/wedding-data.ts` | Opening cover guest fallback, admin message examples | Yes, when no `?to=` or before query name is applied. |
| `Masjid Agung Al-Falah` | `lib/wedding-data.ts` | Event fallback and mapper fallback for empty venue | Yes, until Supabase events override; can remain if events empty/field empty. |
| `Ballroom Hotel Aston` | `lib/wedding-data.ts` | Event/maps fallback | Yes, until Supabase events override; can remain if events empty/field empty. |
| `Jl. Sultan Thaha No. 1, Jambi` | `lib/wedding-data.ts` | Event fallback and mapper fallback | Yes, same event fallback path. |
| `Jl. Sultan Agung No. 99, Jambi` | `lib/wedding-data.ts` | Event fallback | Yes, same event fallback path. |
| `https://maps.google.com` | `lib/wedding-data.ts`, mapper fallback | Event/maps fallback | Yes, and can remain if maps URL empty. |
| `Andi Pratama`, `Siti Nurhaliza`, `Budi Santoso`, `Dewi Lestari` | `lib/wedding-data.ts` | `WishesSection` dummy fallback | Yes after opening wishes section until Supabase wishes replace; remains on empty/error/unconfigured. |
| `Bank BCA 1234567890`, `Bank Mandiri 0987654321` | `lib/wedding-data.ts` | `DigitalGiftSection` | Yes, permanently in current public page. |
| `/images/optimized/bride.webp`, `/images/optimized/groom.webp` | `lib/wedding-data.ts` | `CoupleSection` | Yes, permanently for couple section photos. |
| `/music/music.mp3` | `components/wedding/floating-music-button.tsx` | Floating music button | Yes, permanently. |
| `/images/gallery-1.png` through `/images/gallery-6.png` | `supabase/schema.sql` | Database seed only | Not directly unless the schema seed is run into Supabase. |
| Love story seed `2019`, `2024`, `2026` | `supabase/schema.sql` | Database seed only | Not directly in public page because public page does not fetch love stories. |

## 8. Data Merge Review

Merge function:

- `lib/wedding-data-mapper.ts`
- `mergeSupabaseWeddingData({ settings, events, guestName })`

Merge order:

```text
weddingData static fallback
-> selected settings fields override nested bride/groom, cover, portrait, date, guest, quote text, greeting, music
-> mapped Supabase events override events
-> maps derived from mapped events
```

Shallow/deep behavior:

- Top-level object starts with `...weddingData`.
- Nested `bride`, `groom`, `guest`, `quote`, and `music` are partially rebuilt.
- Many nested/static fields remain by design because they are spread from fallback data.

Supabase fields currently merged:

- bride/groom full names
- bride/groom short names
- bride/groom photo URLs
- cover photo
- portrait photo
- wedding date
- quote text
- greeting title/body
- music URL
- events
- maps derived from events

Fields not merged from Supabase into final public data:

- love stories
- gallery
- bank accounts/gifts
- approved wishes
- closing text
- closing photo
- parent names
- social links
- RSVP text/options
- quote source/label

Merge bugs/risks:

- If `settings` is null, the entire page stays on fallback data.
- If `events.length === 0`, mapper returns `weddingData.events`.
- If an event venue or address is empty, mapper falls back to `weddingData.events[0]`, which can show the old first event venue/address even inside another event.
- `maps_url` falls back to generic `https://maps.google.com`.
- Even though `music_url`, `bride_photo_url`, and `groom_photo_url` are merged, active components currently bypass some of those merged values.

## 9. Section Bypass Review

Components that bypass the final `publicData` object:

- `components/wedding/quote-section.tsx`: receives `data` but renders local constants instead of `data.quote`.
- `components/wedding/couple-section.tsx`: receives `data`, but photos come from imported `weddingData`.
- `components/wedding/love-story-section.tsx`: imports `weddingData` directly.
- `components/wedding/gallery-section.tsx`: owns a local `galleryFiles` list.
- `components/wedding/digital-gift-section.tsx`: imports `weddingData` directly.
- `components/wedding/wishes-section.tsx`: imports `weddingData.wishes` as initial/fallback dummy wishes; Supabase wishes are loaded separately, not through final data.
- `components/wedding/floating-music-button.tsx`: accepts `data?: WeddingData` but uses local `LOCAL_MUSIC_SRC`.

Sections mostly following final data:

- `OpeningCover`
- `HeroSection` for text/date only
- `GreetingSection`
- `CountdownSection`
- `EventSection`
- `MapsSection`
- `ClosingSection`, although some of its fields are never overridden by the mapper

## 10. Cache / Hydration Review

- Public wedding data is loaded client-side in `components/wedding/invitation-page.tsx`.
- Supabase client is created by `createSupabaseBrowserClient()` using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- No server-side fetch, route loader, `fetch` cache, `revalidate`, or Next.js data cache was found in the public data path.
- `app/page.tsx` simply returns `<InvitationPage />`.
- No localStorage/sessionStorage path was found for public wedding data in the inspected flow.
- No service worker evidence was found in the inspected flow.

Conclusion:

- Cache issue: **NO / not supported by inspected code**.
- Hydration issue: **NOT CONFIRMED**.
- Client fetch delay: **YES**.
- Static fallback flash: **YES**.

## 11. Loading State Review

Current visible loading behavior:

- There is no neutral loading state for the main wedding data.
- The page renders complete fallback wedding content while Supabase is loading.
- After Supabase returns, only sections that consume merged `publicData` update.
- Wishes also start from dummy wishes and only replace them after `enabled` becomes true and `getApprovedWishes()` succeeds.

Why old content is visible:

- The app treats static fallback wedding data as renderable UI data, not as a hidden emergency fallback.
- Supabase fetch starts after initial render, so fallback content is already visible before current remote data can arrive.

## 12. Findings

ID: F-01

Title: Initial old data flash comes from static fallback render before Supabase fetch

Severity: MEDIUM

File: `components/wedding/invitation-page.tsx`, `lib/wedding-data.ts`

Evidence: `useState(() => getFallbackWeddingData(null))` renders fallback immediately, then `useEffect` starts the Supabase fetch.

Impact: Users can briefly see old venue, date, guest, gift, or other fallback content before current data appears.

Recommended Direction: Use a neutral loading state or initialize from the final intended source before rendering wedding-specific content.

ID: F-02

Title: Digital gift permanently uses static bank account data

Severity: HIGH

File: `components/wedding/digital-gift-section.tsx`, `lib/wedding-data.ts`

Evidence: `DigitalGiftSection` imports `weddingData` and reads `weddingData.gifts`; public page never fetches or passes `wedding_bank_accounts`.

Impact: Wrong bank/account details can remain visible permanently.

Recommended Direction: Make gifts part of the same final data object or intentionally define the final current gift data in one static source.

ID: F-03

Title: Several sections bypass the final merged data

Severity: MEDIUM

File: `quote-section.tsx`, `couple-section.tsx`, `love-story-section.tsx`, `gallery-section.tsx`, `digital-gift-section.tsx`, `wishes-section.tsx`, `floating-music-button.tsx`

Evidence: Components import local/static data or constants instead of using `publicData`.

Impact: Supabase/admin changes cannot update those sections, and old/static values remain active.

Recommended Direction: For this single wedding website, pick one final data source and pass it consistently to public sections.

ID: F-04

Title: Supabase service supports love story/gallery/bank accounts but public page does not use them

Severity: MEDIUM

File: `lib/services/wedding-service.ts`, `components/wedding/invitation-page.tsx`

Evidence: `getWeddingGallery()`, `getWeddingLoveStories()`, and `getWeddingBankAccounts()` exist, but public page only calls `getWeddingSettings()` and `getWeddingEvents()`.

Impact: Admin/database data for these tables can be correct while the public site still shows local/static content.

Recommended Direction: Either remove those tables from the public contract for this one-site project or load/map them into final public data.

ID: F-05

Title: Wishes show dummy testimonials as initial and fallback state

Severity: MEDIUM

File: `components/wedding/wishes-section.tsx`, `lib/wedding-data.ts`

Evidence: Initial state is `dummyWishes`, and fallback/error paths reset to `dummyWishes`.

Impact: Fake wishes can appear as real guest wishes, especially if Supabase is empty or unavailable.

Recommended Direction: Use neutral empty/loading states for wishes instead of dummy testimonial fallback.

ID: F-06

Title: Event mapper can retain old venue/address values when Supabase event fields are empty

Severity: MEDIUM

File: `lib/wedding-data-mapper.ts`

Evidence: Empty event fields fall back to `weddingData.events[0]?.venue`, `weddingData.events[0]?.address`, or `weddingData.events`.

Impact: A partially filled Supabase event can still display old venue/address data.

Recommended Direction: Treat empty event fields as missing UI state or use explicit final defaults that are current.

ID: F-07

Title: Seed SQL contains old/dummy data that can repopulate the database

Severity: LOW

File: `supabase/schema.sql`

Evidence: Seed inserts include old venues, 2019/2024 love story rows, `/images/gallery-*.png`, dummy wishes, sample bank accounts, and `Bapak Hadi Sekeluarga`.

Impact: Not directly visible unless schema/seed is run, but it can reintroduce old data into Supabase.

Recommended Direction: Before any future DB reset, align seed data with the final current wedding data or remove sample inserts.

## 13. Simplest Recommended Fix Plan

1. Decide the single final public data source for this one wedding website: Supabase-backed final data or one current static config.
2. Stop rendering wedding-specific fallback content during the initial Supabase load; show a neutral loading/cover state instead.
3. Extend the final data object to include love story, gallery, gifts, music, wishes behavior, closing, and couple photos, or intentionally keep those as current static config.
4. Update bypassing sections so public UI reads from the same final data path.
5. Replace dummy fallback wishes/gifts/events with neutral empty states or verified current production values.
