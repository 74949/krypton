# Aronxx Tech Website

Production-ready Next.js website with a premium processor intro, multi-page marketing experience, abstract public architecture, live industry intelligence, Supabase lead storage, email notifications, private analytics and Excel export.

## Quick start

Requirements: Node.js 22.13+ and npm 10+.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The public website works without backend keys, but demo and pilot submissions require Supabase configuration.

## Important routes

- `/` — homepage and live industry intelligence
- `/dashboard` — complete industry and sub-industry risk dashboard
- `/how-it-works` — abstracted public architecture
- `/contact` and `/pilot` — backend-connected forms
- `/admin/analytics` — protected lead analytics and Excel export
- `/api/health` — safe configuration status check

## Backend

1. Create a Supabase project.
2. Run `supabase/schema.sql` in Supabase SQL Editor.
3. Create a Resend API key and verify a sending domain for production.
4. Fill `.env.local` using `.env.example`.
5. Restart the development server.

Notifications default to `goransh1601@gmail.com`. Never commit `.env.local` or expose the Supabase service-role key in browser code.

## Validation

```powershell
npm run lint
npm run build
npm run start
```

See `SETUP_AND_DEPLOYMENT.md` for the complete Windows, Supabase, Resend, GitHub and Vercel walkthrough.

## Data clarity

The industry dashboard uses the CISA Known Exploited Vulnerabilities catalog as a live public pressure signal. Industry scores and financial ranges are explicitly modeled estimates, not observed losses for named companies. Public-feed availability and refresh time are shown in the interface.
