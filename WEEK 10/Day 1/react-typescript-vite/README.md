# React + TypeScript Exercises

A Vite project for practicing typed React props, state, optional props, and
effects. The app includes a greeting, an interactive counter, example user
cards, and a directory fetched from JSONPlaceholder.

## Run locally

```sh
npm install
npm run dev
```

## Verify

```sh
npm run build
npm run lint
```

## Components

- `src/components/Greeting.tsx` demonstrates required, typed props.
- `src/components/Counter.tsx` demonstrates typed state and state updates.
- `src/components/UserCard.tsx` demonstrates optional props and defaults.
- `src/components/UserList.tsx` demonstrates typed API data, loading, errors,
  cancellation, and retry behavior.
