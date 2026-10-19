# Generic Data Fetcher Daily Challenge

A React + TypeScript challenge demonstrating a generic data-fetching component
and Redux Toolkit request state using recipe API data.

## Run locally

```sh
npm install
npm run dev
```

Open the local address printed by Vite. Run `npm run build` for a production
type-check and build.

## API source

The app uses TheMealDB's public chicken-recipe search by default. To use
Spoonacular through RapidAPI, copy `.env.example` to `.env.local`, add
`VITE_RAPIDAPI_KEY`, then restart Vite. Vite exposes `VITE_` values to the
browser, so use a backend proxy instead of a client-side key in production.

## Structure

- `Creating a generic data.ts` defines the shared recipe and Redux-state types.
- `src/api/api.ts` fetches and validates API data.
- `src/features/dataSlice.ts` stores fetched items, loading state, and errors.
- `src/components/DataFetcher.tsx` is generic over its item type.
- `src/app/` contains the Redux store and typed hooks.
- `src/App.tsx` demonstrates typed recipe rendering.
