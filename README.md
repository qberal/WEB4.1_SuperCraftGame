# Super Craft Game

## Project Overview
Super Craft Game is an engaging game developed using Vue 3 for the frontend and Node.js with Express and SQLite for the backend. The project involves crafting mechanics and aims to provide an entertaining user experience.

### Functionalities

- Register / Login
- Login via [CAS](https://cas.insa-rouen.fr) (*only  at [supercraftgame.insa.lol](https://supercraftgame.insa.lol)*)
- Game Modes:
  - Classic Mode: Find all elements to win the game.
  - Infinity Mode: Deduce the word of the day by combining elements.
- Inventory: supports search functionality
- Game Canvas: supports drag and drop, cleaning, saved locally for each game mode
- Leaderboard for Classic and Infinityy mode

## How to Use

### Hosted Version
You can access the hosted version of the game at [supercraftgame.insa.lol](https://supercraftgame.insa.lol).

### Running Locally

#### 1. Setup Backend
- Navigate to the backend directory:
  ```sh
  cd backend
  ```
- Copy the `.env.example` file to `.env` and add your GROQ API key. You can obtain a GROQ API key from the [GROQ website](https://groq.com).

#### 2. Using Docker
- From the root directory, run:
  ```sh
  docker compose up -d --build
  ```
  The application will be available on port 3434 or the port specified in the Docker Compose file for the frontend.

#### 3. Using npm
- Install dependencies and run the development servers:
  ```sh
  npm install
  npm run dev
  ```
  Execute the above commands in both the `frontend` and `backend` directories.

#### 4. Build and Serve
- To build the project for production and serve it using a server of your choice:
  - Frontend:
    ```sh
    npm run build
    ```
    To serve the project for production, you should use a server that supports single-page applications (SPA) and ensure that all routes are redirected to index.html.
  - Backend:
    ```sh
    npm run start
    ```

## Tech Stack
- **Frontend:** Vue 3
  - Libraries: `animate.css`, `axios`, `element-plus`, `vue-router`
- **Backend:** Node.js, Express, SQLite
  - Libraries: `bcrypt`, `cors`, `dotenv`, `express`, `express-session`, `groq-sdk`, `sqlite3`,
- **Development Tools:** `nodemon`, `vite`, `vite-plugin-vue-devtools`
