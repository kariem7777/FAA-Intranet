# FAA Intranet

Internal React + Vite application for legislation, legal opinions, documents, notifications, dashboards, and Azure AD-backed authentication flows.

## Tech Stack

- React 19
- Vite 7
- TypeScript
- Redux Toolkit
- React Router 7
- Tailwind CSS 4
- MSAL for Azure authentication

## Project Structure

- `src/features` feature modules for legislation, documents, legal opinions, dashboard, notifications, and authentication
- `src/shared` shared UI, hooks, API helpers, pages, and utilities
- `src/providers` app-level providers for Redux, auth, dialogs, and toasts
- `src/store` Redux store setup and typed hooks
- `public` static assets
- `Azure` isolated Azure auth experiments and support files

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` runs TypeScript checks and creates the production bundle
- `npm run lint` runs ESLint across the repository
- `npm run preview` serves the production build locally

On Windows PowerShell, `npm.cmd run <script>` may be needed if execution policies block `npm`.

## Environment

Create a `.env` file with the backend and Azure values required by the app. The Vite dev server proxy reads `VITE_BACKEND_URL`.

## Cleanup Highlights

- Routing is centralized in `src/AppRouter.tsx`
- Shared UI primitives live under `src/shared/components/ui`
- Async feature data is managed with Redux Toolkit slices and thunks
