# README

## Tech Stack

1. **Node.js** - For backend server
2. **React.js (Vite Template)** - For frontend server
3. **PostgreSQL Database** - For storing data

---

## Pre-requisites

To run the app locally, ensure the following are installed:

1. **Node.js** - Download from the official website.
2. **Git** - Download from the official website.
3. **PostgreSQL Database** - Download from the official website.

---

## Package Installation

### Backend (Run `npm install` in the backend directory):

- `axios`
- `body-parser`
- `cors`
- `dotenv`
- `express`
- `pg`

### Frontend (Run `npm install` in the frontend directory):

- **React App with Vite Template**: `npm create vite@latest frontend -- --template react`
- `@radix-ui/react-select`
- `@radix-ui/react-slot`
- `lucide-react`
- `react-router-dom`
- `clsx`
- `tailwindcss-animate`
- `class-variance-authority`
- `tailwind-merge`
- `axios`

---

## Migration and Seeding Steps

To set up the database and seed it with data:

1. Create a new database in PostgreSQL Admin.
2. Create a new table in the database using the name and type declarations specified in the `tablecreation.sql` file in the backend folder.
3. Access all Pokemon API pages from [PokeAPI](https://pokeapi.co/), fetch necessary data using `axios`, and seed the data into the PostgreSQL database using `pg` by running the `seed.js` file.
4. Update the frontend server web address in the `app.use(cors({ origin: " " }))` function call to allow the frontend server to access data during API calls.

---

## Running the App

To run the app locally:

1. Ensure all files are saved in the same directory path as in the repository.
2. Start the backend server:
   - Navigate to the `backend` directory in the command prompt.
   - Run the command: `node server.js`.
3. Start the frontend server:
   - Open a new command prompt.
   - Navigate to the `frontend` directory.
   - Run the command: `npm run dev`.

---
