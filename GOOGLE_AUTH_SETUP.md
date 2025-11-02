# Google Authentication Setup Guide

## Issue Fixed
The "Session exchange error: invalid request: both auth code and code verifier should be non-empty" error has been resolved by:

1. ✅ Explicitly configuring PKCE flow in the Supabase client
2. ✅ Adding Next.js middleware to handle auth cookies properly
3. ✅ Removing manual `exchangeCodeForSession` call (now handled automatically by `@supabase/ssr`)
4. ✅ Adding proper error handling and toast notifications

## Required Supabase Dashboard Configuration

To complete the Google OAuth setup, you need to configure the following in your Supabase Dashboard:

### 1. Add Redirect URLs

Go to **Authentication > URL Configuration** in your Supabase Dashboard and add these URLs:

**Site URL:**
```
http://localhost:3000
```

**Redirect URLs (add all of these):**
```
http://localhost:3000/auth/callback
http://localhost:3000
```

For production, also add:
```
https://your-production-domain.com/auth/callback
https://your-production-domain.com
```

### 2. Configure Google OAuth Provider

Go to **Authentication > Providers** in your Supabase Dashboard:

1. Find **Google** in the list of providers
2. Enable it
3. Add your Google OAuth credentials:
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)

### 3. Google Cloud Console Setup

If you haven't set up Google OAuth credentials yet:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth client ID**
5. Choose **Web application**
6. Add Authorized JavaScript origins:
   ```
   http://localhost:3000
   https://your-production-domain.com
   ```
7. Add Authorized redirect URIs:
   ```
   https://uxjsdzryhpcckayazqev.supabase.co/auth/v1/callback
   ```
   (Use your actual Supabase project URL)

8. Copy the **Client ID** and **Client Secret** and add them to Supabase Dashboard

## Testing the Fix

1. **Clear your browser cache and cookies** for localhost
2. Restart your Next.js dev server:
   ```bash
   npm run dev
   ```
3. Navigate to the login page
4. Click "Sign in with Google"
5. The OAuth flow should now work correctly

## What Changed in the Code

### 1. `app/lib/supabaseClient.ts`
- Added explicit PKCE flow configuration
- Enabled session detection in URL
- Configured auto token refresh

### 2. `middleware.ts` (NEW FILE)
- Handles Supabase auth cookies on the server side
- Required for PKCE flow to work correctly with Next.js
- Refreshes sessions automatically

### 3. `app/auth/callback/page.tsx`
- Removed manual `exchangeCodeForSession` call
- Now relies on `@supabase/ssr` automatic handling
- Added fallback for hash fragment auth
- Improved error handling with toast notifications

### 4. `app/login/page.tsx`
- Added Google OAuth specific query params
- Added toast notifications for errors

## Troubleshooting

If Google sign-in still doesn't work:

1. **Check browser console** for any error messages
2. **Verify Redirect URLs** in Supabase Dashboard match exactly (including protocol)
3. **Check Google Cloud Console** that the Supabase callback URL is whitelisted
4. **Clear localStorage** in browser DevTools (Application tab)
5. **Try incognito/private browsing** to rule out cached auth state
6. **Verify environment variables** are set correctly in `.env.local`

## Environment Variables

Make sure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://uxjsdzryhpcckayazqev.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```


