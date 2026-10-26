# Fable — Collaborative Storytelling

A small full-stack storytelling app built as a TypeScript monorepo. Authors can publish stories, invite contributors by email or account ID, collaborate on edits, discuss drafts, and browse earlier versions.

## Project layout

- `backend/` — Express 5 REST API, JWT authentication, PostgreSQL access and schema.
- `frontend/` — responsive React + Vite app with Redux Toolkit state.
- `types/` — shared TypeScript models.

## Local development

Requirements: Node.js 20+ and a running PostgreSQL database.

1. From this directory, install dependencies:

   ```sh
   npm install
   ```

2. Copy `backend/.env.example` to `backend/.env`, set `DATABASE_URL`, and replace both authentication secrets with long random values. `FRONTEND_URL` defaults to the local Vite URL.
3. Initialize the database:

   ```sh
   npm run db:init
   ```

4. Start the API and frontend together:

   ```sh
   npm run dev
   ```

   The API runs at `http://localhost:3001`, and the frontend at `http://localhost:5173`.

For frontend-only environment overrides, copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL`.

## API overview

All routes use the `/api` prefix. Except for registration, login, refresh, logout, and health checks, routes require `Authorization: Bearer <access-token>`.

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/stories`, `GET /api/stories/:id`, `POST /api/stories`, `PATCH /api/stories/:id`, `DELETE /api/stories/:id`
- `POST /api/contributors`, `GET /api/contributors/:story_id`, `DELETE /api/contributors/:id`
- `GET /api/stories/:id/versions`
- `GET /api/stories/:id/comments`, `POST /api/stories/:id/comments`
- `GET /api/health`

Access tokens are held only in the Redux store (memory). Refresh tokens are HTTP-only cookies, and expired access-token requests are refreshed and retried once. The API validates input and uses parameterized SQL. Only story authors can invite/remove contributors or delete their story; authors and contributors may edit.

## Scripts

- `npm run dev` — run both workspaces in development mode.
- `npm run build` — type-check and build the backend and frontend.
- `npm run db:init` — create the tables and indexes (safe to run more than once).
- `npm run build --workspace backend` — compile the API.
- `npm run build --workspace frontend` — type-check and produce the static frontend in `frontend/dist`.

## Deployment notes

Deploy the backend as a Node web service using the Mini project directory as its root. Build with `npm install && npm run build --workspace backend`, and start with `npm run start --workspace backend`. Set `DATABASE_URL`, `JWT_SECRET`, `REFRESH_SECRET`, `FRONTEND_URL`, and `NODE_ENV=production`. Set `DATABASE_SSL=true` only if your PostgreSQL provider requires TLS; the connection validates the server certificate.

Deploy the frontend as a static site from the same project root. Build with `npm install && npm run build --workspace frontend`, publish `frontend/dist`, and set `VITE_API_URL` to the deployed API's `/api` URL. Configure `FRONTEND_URL` on the API to the exact deployed frontend origin. Initialize the production database by running the database initialization script against that database before first use.
