# Phase 0 - Security and Build Foundation

## 1. Initial State

- Git state before Phase 0 was already dirty: `lib/wedding-data.ts`, `tsconfig.tsbuildinfo`, deleted `wedding-invitation-website.zip`, untracked audit file, and several untracked ornament files.
- Admin login used Supabase email/password through the browser client.
- Admin protection was only a client-side redirect in `components/admin/admin-shell.tsx`.
- No `middleware.ts` existed.
- Sensitive admin operations went directly from browser components to Supabase.
- RLS treated every Supabase Auth `authenticated` user as an admin.
- `next.config.mjs` had `typescript.ignoreBuildErrors: true`.
- Typecheck was available through local TypeScript binary.
- Lint script existed, but `eslint` was not installed/available.

## 2. Auth Flow Before

- User logged in from `app/admin/login/page.tsx` using `supabase.auth.signInWithPassword`.
- Session was read with `supabase.auth.getUser()` in browser components.
- Project used a Supabase browser client from `lib/supabase/client.ts`.
- `lib/supabase/server.ts` existed, but admin routes did not use server-side session enforcement.
- `/admin` used `app/admin/layout.tsx`, which rendered client component `AdminShell`.
- Only `AdminShell` redirected unauthenticated users.
- Admin data mutations did not check authorization in app code; they relied on Supabase RLS.
- RLS differentiated `anon` and `authenticated`, but not admin vs non-admin authenticated users.
- No role column, profile table, allowlist, or admin membership table existed.

## 3. Problems Confirmed

- Login equaled admin because RLS used `to authenticated using (true)` for admin policies.
- `/admin` protected content was gated after hydration, not before route rendering.
- Non-admin authenticated Supabase users could satisfy old RLS admin policies.
- Production build could ignore TypeScript errors.
- Lint remained unavailable because the project has no ESLint dependency/tooling installed.

## 4. Implementation

Masalah: Admin authorization was too broad.

- File: `supabase/schema.sql`
- Perubahan: Added `admin_users` table keyed by `auth.users.id`.
- Alasan: Authenticated users must be explicitly allowlisted before they are admins.

Masalah: Existing production RLS treated all authenticated users as admins.

- File: `supabase/production-policies.sql`
- Perubahan: Added `admin_users` RLS and changed admin policies to require `exists (select 1 from admin_users where user_id = auth.uid())`.
- Alasan: Admin mutation/read access is enforced at database/RLS layer, not only UI.

Masalah: Existing databases need a non-destructive patch.

- File: `supabase/phase-0-admin-authorization.sql`
- Perubahan: Added standalone SQL patch that creates `admin_users`, enables RLS, replaces broad policies, and includes a commented template to add the real admin user id.
- Alasan: Existing Supabase projects should not need a fresh migration/reset.

Masalah: Admin routes had only client-side route protection.

- File: `middleware.ts`
- Perubahan: Added middleware for `/admin/:path*`, excluding `/admin/login` and `/admin/unauthorized`.
- Alasan: Anonymous users and non-admin users are redirected before protected admin content is served.

Masalah: Middleware needed a verified server-readable admin session.

- File: `app/api/admin/session/route.ts`
- Perubahan: Added POST endpoint that verifies the Supabase access token with Supabase Auth, checks `admin_users`, and sets an HttpOnly admin cookie. Added DELETE endpoint to clear the cookie.
- Alasan: Middleware cannot read browser localStorage; it needs a server-readable cookie that is created only after verification.

Masalah: Shared admin verification logic was needed.

- File: `lib/supabase/admin-auth.ts`
- Perubahan: Added `checkAdminAccessToken`, admin cookie constants, and token-scoped Supabase client.
- Alasan: Middleware and session route use the same verification logic.

Masalah: Login flow allowed any valid Supabase user to proceed.

- File: `app/admin/login/page.tsx`
- Perubahan: After Supabase login, the page calls `/api/admin/session`; non-admin users are signed out and redirected to `/admin/unauthorized`.
- Alasan: Supabase login is not enough; admin membership must be checked.

Masalah: Client admin shell still assumed logged-in user was enough.

- File: `components/admin/admin-shell.tsx`
- Perubahan: Added client-side admin membership check as UX layer, allowed `/admin/unauthorized`, and cleared the server admin cookie on logout.
- Alasan: Client guard remains useful for UX, but no longer represents the security boundary.

Masalah: Production build ignored TypeScript errors.

- File: `next.config.mjs`
- Perubahan: Removed `typescript.ignoreBuildErrors`.
- Alasan: TypeScript errors now fail production build.

## 5. Auth Flow After

Anonymous

-> `/admin/*` middleware checks missing admin cookie and redirects to `/admin/login?next=...`.

Authenticated Non-Admin

-> Supabase login succeeds, but `/api/admin/session` verifies the token and rejects because no `admin_users` row exists. User is signed out and sent to `/admin/unauthorized`. If a non-admin reaches middleware with a token, middleware redirects to `/admin/unauthorized`.

Admin

-> Supabase login succeeds, `/api/admin/session` verifies the token and `admin_users` membership, sets HttpOnly `wedding_admin_access_token`, and middleware allows `/admin/*`.

## 6. Database / RLS Changes

SQL files:

- `supabase/schema.sql`
- `supabase/production-policies.sql`
- `supabase/phase-0-admin-authorization.sql`

Policy lama:

- All Supabase Auth users with role `authenticated` were allowed to manage wedding settings, events, gallery, love stories, bank accounts, guests, and message templates.
- All authenticated users could read/update/delete admin-only wish data.

Policy baru:

- `admin_users` stores explicit admin membership by `auth.users.id`.
- Authenticated users can read only their own admin membership row.
- Admin policies require `exists (select 1 from admin_users where user_id = auth.uid())`.
- Anonymous public read/insert policies remain scoped to public invitation behavior.

Compatibility impact:

- Existing admin users must be inserted into `admin_users` manually.
- Until the SQL patch is applied and at least one admin row exists, admin login will be denied.
- This is intentional fail-closed behavior.

## 7. Build Enforcement

`typescript.ignoreBuildErrors` was removed from `next.config.mjs`.

After this change:

- TypeScript errors are not ignored by `next build`.
- Global TypeScript strictness was not reduced.
- No `@ts-ignore` or mass `any` workaround was added.

## 8. Validation Results

- Typecheck: PASS
  Command: `.\node_modules\.bin\tsc.cmd --noEmit --incremental false`
  Exit code: 0

- Build: PASS
  Command: `cmd /c "npm run build > phase0-build-output.log 2>&1 & echo EXIT_CODE:%ERRORLEVEL%"`
  Exit code: 0

- Lint: FAIL
  Command: `npm run lint`
  Exit code: 1
  Reason: `eslint` is not recognized; lint tooling is not installed. Deferred because Phase 0 scope does not include lint tooling setup.

- Tests: NOT AVAILABLE
  Reason: No test script or test files were found under `app`, `components`, or `lib`.

## 9. Security Regression Matrix

| Case | Expected | Result | Verification Method |
| ---- | -------- | ------ | ------------------- |
| Anonymous opens `/admin` | Redirect to login; no protected content | Implemented in `middleware.ts` | VERIFIED BY CODE INSPECTION |
| Authenticated non-admin opens `/admin` | Redirect/denied | Implemented by middleware and login session route checking `admin_users` | VERIFIED BY CODE INSPECTION |
| Admin opens `/admin` | Allowed | Implemented when token is valid and `admin_users` row exists | VERIFIED BY CODE INSPECTION |
| Anonymous tries admin mutation directly | Denied | RLS admin mutation policies require authenticated admin membership | VERIFIED BY CODE INSPECTION |
| Authenticated non-admin tries admin mutation directly | Denied | RLS checks `admin_users` for admin policies | VERIFIED BY CODE INSPECTION |
| Admin performs valid mutation | Allowed | RLS permits when `auth.uid()` exists in `admin_users` | VERIFIED BY CODE INSPECTION |
| Production build has TypeScript error | Build fails | `ignoreBuildErrors` removed; current build passes without errors | VERIFIED BY EXECUTION |

## 10. Files Changed

- `next.config.mjs` - removed TypeScript build error bypass.
- `middleware.ts` - added server-side admin route protection.
- `app/api/admin/session/route.ts` - added verified admin session cookie endpoint.
- `app/admin/login/page.tsx` - requires admin session creation after Supabase login.
- `app/admin/unauthorized/page.tsx` - added explicit non-admin denial page.
- `components/admin/admin-shell.tsx` - added admin membership UX guard and cookie cleanup on logout.
- `lib/supabase/admin-auth.ts` - added shared admin token verification helper.
- `supabase/schema.sql` - added `admin_users` table for new installs.
- `supabase/production-policies.sql` - replaced broad authenticated admin policies with explicit admin membership checks.
- `supabase/phase-0-admin-authorization.sql` - added manual non-destructive SQL patch for existing Supabase projects.

Pre-existing dirty files not created by Phase 0:

- `lib/wedding-data.ts`
- `tsconfig.tsbuildinfo`
- `wedding-invitation-website.zip`
- untracked ornament files
- `AUDIT_WEDDING_INVITATION.md`

## 11. Remaining Risks

- SQL patch has not been executed against the live Supabase database in this workspace session.
- The first admin must be added manually to `admin_users`.
- Admin cookie stores the Supabase access token server-side as an HttpOnly cookie for middleware verification; users may need to log in again when it expires.
- Admin operations are still browser-to-Supabase calls; RLS is the backend enforcement layer.
- Public RSVP/wishes spam protection remains out of scope and unresolved.
- Project still has no automated tests.
- Lint tooling remains unavailable.
- The project still uses single-invitation tables and is not multi-tenant.

## 12. Deferred to Next Phase

- Single source wedding data.
- RSVP/wishes spam protection.
- Guest token.
- Save the Date.
- Image optimization.
- Lint tooling.
- Repository cleanup.
