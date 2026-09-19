# Aronxx Tech — Complete Setup and Deployment Guide

## 1. Install the required software

Install Node.js 22.13 or newer, Git and Visual Studio Code. Docker is not required.

```powershell
node -v
npm -v
git --version
```

## 2. Extract and open the project

Extract the ZIP, open PowerShell inside the extracted folder and run:

```powershell
npm install
Copy-Item .env.example .env.local
```

## 3. Create the Supabase database

1. Create a project at Supabase.
2. Open **SQL Editor**.
3. Copy all SQL from `supabase/schema.sql` and run it.
4. Open **Project Settings → API**.
5. Copy the Project URL and service-role key into `.env.local`:

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Keep the service-role key private. Never paste it into frontend code or commit `.env.local`.

## 4. Configure email notifications

1. Create a Resend account and API key.
2. During testing, use the Resend onboarding sender. For production, verify your domain and replace the sender.
3. Add these values to `.env.local`:

```env
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL="Aronxx Tech Leads <onboarding@resend.dev>"
LEAD_NOTIFICATION_EMAIL=goransh1601@gmail.com
```

## 5. Create the private administrator token

Generate a long random value in PowerShell:

```powershell
[Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 }))
```

Put it in `.env.local`:

```env
ADMIN_EXPORT_TOKEN=paste_the_generated_value_here
```

This token opens `/admin/analytics` and enables Excel export.

## 6. Run locally

```powershell
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Industry intelligence: `http://localhost:3000/dashboard`
- Private analytics: `http://localhost:3000/admin/analytics`
- Configuration check: `http://localhost:3000/api/health`

Replay the opening animation from the browser console:

```javascript
sessionStorage.removeItem("aronxx-tech-intro-seen");
location.reload();
```

## 7. Test the backend

1. Submit the Request Demo form.
2. Confirm the success message.
3. Confirm the row in Supabase → Table Editor → `demo_requests`.
4. Confirm the email at `goransh1601@gmail.com`.
5. Open `/admin/analytics`, enter the token and inspect the graphs.
6. Select **Export Excel** and open the workbook.

If the database works but email does not arrive, check Resend logs and verify the sender address/domain.

## 8. Production test

Stop the development server with `Ctrl+C`, then run:

```powershell
npm run lint
npm run build
npm run start
```

Open `http://localhost:3000` and check desktop and mobile layouts.

## 9. Push to GitHub

```powershell
git init
git add .
git commit -m "Complete Aronxx Tech website"
git branch -M main
git remote add origin https://github.com/74949/krypton.git
git push -u origin main
```

If `origin` already exists:

```powershell
git remote set-url origin https://github.com/74949/krypton.git
git push -u origin main
```

## 10. Deploy to Vercel

1. In Vercel choose **Add New → Project**.
2. Import `74949/krypton`.
3. Select the **Next.js** framework preset.
4. Keep Root Directory as `./`.
5. Keep Build Command and Output Directory on their Next.js defaults.
6. Add these six Environment Variables for Production, Preview and Development:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
LEAD_NOTIFICATION_EMAIL
ADMIN_EXPORT_TOKEN
```

7. Select **Deploy**.

## 11. Verify deployment

1. Open `/api/health` and confirm database, email and admin configuration.
2. Submit one test request.
3. Check Supabase, email and Excel export.
4. Open `/dashboard` and check the public-feed badge and update time.
5. Test navigation, forms, animation and architecture on desktop and mobile.

## Live-data behavior

- CISA KEV is refreshed server-side with a one-hour cache.
- The dashboard refreshes automatically every hour and supports manual refresh.
- If the feed is unavailable, the interface visibly switches to benchmark mode.
- Financial ranges are modeled estimates for a mid-sized organization, not claims about named companies.
- Demo and pilot analytics update when Supabase stores new records.

## Production checklist

- Use a verified Resend sending domain.
- Review privacy and terms with a qualified legal professional for your final operating jurisdiction.
- Never publish `.env.local`, service-role keys or administrator tokens.
- Add your custom domain under Vercel → Project Settings → Domains.
