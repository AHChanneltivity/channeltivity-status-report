# Channeltivity Status Report App

A web app that pulls implementation data from Notion and generates a clean, printable status report.

---

## Deploy to Vercel (one time setup)

### Step 1 — Put the files on GitHub

1. Go to github.com and create a new repository called `channeltivity-status-report`
2. Make it private
3. Upload all these files keeping the same folder structure:
   - `package.json`
   - `vercel.json`
   - `api/projects.js`
   - `api/project.js`
   - `api/save.js`
   - `public/index.html`

### Step 2 — Deploy on Vercel

1. Go to vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Import your `channeltivity-status-report` repo
4. Click Deploy (no build settings needed)

### Step 3 — Add environment variables

In your Vercel project go to Settings → Environment Variables and add:

| Name | Value |
|------|-------|
| `NOTION_TOKEN` | Your Notion integration secret (starts with `secret_`) |
| `NOTION_DATABASE_ID` | `8338f4c8b5e3832b9e3601814ab7a7a0` |

Click Save, then go to Deployments and redeploy.

### Step 4 — Done

Your app is live at the URL Vercel gives you (e.g. `channeltivity-status-report.vercel.app`).
Bookmark it. Open it any time from any browser.

---

## Weekly workflow

1. Open your app URL
2. Select a project from the dropdown
3. Pick the week date
4. Click Load — data pulls from Notion
5. Update the dropdowns and text fields
6. Click "Save to Notion & Preview" — saves back to Notion and shows the report
7. Click "Print / Save as PDF" to export

---

## Notion database setup

Make sure your Notion database has these exact property names:

| Property | Type | Options |
|----------|------|---------|
| Project Name | Title | — |
| Target Go-Live | Date | — |
| Overall Status | Select | On Track, At Risk, Blocked |
| Portal Setup | Select | Upcoming, In Progress, Complete |
| Groups & Permissions | Select | Upcoming, In Progress, Complete |
| Module Config | Select | Upcoming, In Progress, Complete |
| CRM Integration | Select | Upcoming, In Progress, Complete, N/A |
| UAT & Training | Select | Upcoming, In Progress, Complete |
| Go-Live Status | Select | Upcoming, In Progress, Complete |
| This Week | Text | — |
| Next Week | Text | — |
| Decisions Needed | Text | — |
| Risks & Blockers | Text | — |

Property names are case-sensitive. Make sure they match exactly.

---

## Adding a custom domain (optional)

In Vercel go to Settings → Domains and add something like `status.channeltivity.com`.
Requires access to your DNS settings.
