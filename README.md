# CareNexon Technology - Deployment Guide

This project is optimized for deployment on **Vercel**.

## 🚀 Deployment Steps

1.  **Push to GitHub**: Push this repository to your GitHub account.
2.  **Import to Vercel**: Connect your GitHub account to Vercel and import this project.
3.  **Configure Environment Variables**:
    *   In Vercel Dashboard, go to **Settings > Environment Variables**.
    *   Add `VITE_API_URL` (e.g., `https://api.carenexon.co.uk/v1`).
    *   Add `VITE_ENABLE_MOCK_AUTH` as `true`.

## 🛠 Project Structure

*   `/src/App.tsx`: Main routing configuration using `react-router-dom`.
*   `/src/components/LandingPage.tsx`: The premium "Executive Preview" landing page.
*   `/src/components/DemoApp.tsx`: The Clinician Portal (Admin Dashboard).
*   `/vercel.json`: Configuration for SPA routing redirects.
*   `/.env.example`: Template for environment variables.

## 🔑 Authentication (Demo Mode)

For the purpose of this demo, a **Mock Auth** logic is implemented in `App.tsx`. 
*   Clicking **"Register as Clinician"** or **"Request Demo"** sets a `demo_auth` flag in `localStorage`.
*   The `/dashboard` route is protected and will redirect to `/` if the flag is missing.

## 📦 Build Command

The build command is automatically detected as:
```bash
npm run build
```
(Which executes `vite build`)
