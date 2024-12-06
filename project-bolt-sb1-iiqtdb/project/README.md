# Music Player Web Application

A simple music player web application built with Node.js, Express, and SQLite3. This application allows users to manage their music collection through basic CRUD operations.

## Features

- Create, Read, Update, and Delete songs
- Store song information including name, artist, and description
- Responsive web interface
- SQLite database for data persistence

## Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/web-app.git
   cd web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Database Structure

The application uses SQLite3 with a single table:

- Table: songs
  - id (INTEGER PRIMARY KEY AUTOINCREMENT)
  - name (VARCHAR 255 NOT NULL)
  - description (TEXT)
  - artist (VARCHAR 255)
  - date_created (TIMESTAMP)

## API Endpoints

- GET / - View all songs
- POST /songs - Create a new song
- PUT /songs/:id - Update a song
- PATCH /songs/:id - Partially update a song
- DELETE /songs/:id - Delete a song