# Student AI Hub (Full)

This is a ready-to-run Next.js project (App Router) with Tailwind, OpenAI integration, and Supabase Auth (client).

## Quick start

1. Copy `.env.local.example` to `.env.local` and fill in your keys (OpenAI and Supabase).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run locally:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Notes
- The project expects `OPENAI_API_KEY` (server-side) and `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (client) to be set.
- The Supabase auth button uses Google OAuth via supabase-js signInWithOAuth; configure Google provider in your Supabase project.
- This repo is provided as a starter; before production, add rate-limiting, authentication for API routes, and input validation.
