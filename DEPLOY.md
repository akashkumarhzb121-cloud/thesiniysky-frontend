# TheSiniySky Frontend - Vercel Deployment

## Live URL
https://thesiniysky.vercel.app

## Backend API
https://thesiniysky-backend.onrender.com/api/v1

## One-Click Deploy
1. Go to https://vercel.com/new
2. Import this GitHub repo
3. Vercel auto-detects Next.js
4. Add Environment Variables (see below)
5. Click Deploy

## Environment Variables
| Key | Value |
|-----|-------|
| NEXT_PUBLIC_API_URL | https://thesiniysky-backend.onrender.com/api/v1 |
| NEXT_PUBLIC_SOCKET_URL | https://thesiniysky-backend.onrender.com |
| NEXT_PUBLIC_SITE_URL | https://thesiniysky.vercel.app |

## Auto-Deploy
Every push to `main` branch triggers automatic deployment via GitHub Actions.
