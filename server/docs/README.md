# Profind

## Project structure

- `client/`: React + Vite frontend
- `server/`: Express backend
- `api/`: serverless wrapper for deployment (`api/index.js` imports `server/index.js`)

## Local development

1. Install dependencies from repo root:
   - `npm install`
2. Create `.env` from `.env.example` and fill required values.
3. Run frontend:
   - `npm run dev`
4. Run backend (new terminal):
   - `npm run server`

## Workspace scripts (run from root)

- `npm run dev` -> starts `client`
- `npm run server` -> starts `server`
- `npm run build` -> builds `client`
- `npm run test` -> runs `client` tests
- `npm run lint` -> lints `client`
