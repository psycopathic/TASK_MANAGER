# Full-Stack Task Manager

## Project Structure

- `backend/`: Node.js + Express API with modular MVC under `src/modules`
- `frontend/`: React + Vite application using a multi-directory structure

## Backend Architecture

```txt
backend/src
  app.js
  index.js
  config/
  middlewares/
  routes/
  modules/
    task/
      task.model.js
      task.service.js
      task.controller.js
      task.routes.js
```

## Frontend Architecture

```txt
frontend/src
  app/
  layouts/
  pages/
  features/
    tasks/
      components/
      services/
  components/
    common/
  services/
  styles/
```

## Run The Project

Install dependencies once (already done during setup):

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

Start backend + frontend together:

```bash
npm run dev
```

Or run individually:

```bash
npm run dev:backend
npm run dev:frontend
```

## API Base URL

The frontend calls:

- `http://localhost:5000/api`

Set `frontend/.env` if you want a different value:

```bash
VITE_API_URL=http://localhost:5000/api
```
