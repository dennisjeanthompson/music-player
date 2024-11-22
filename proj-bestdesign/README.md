# Music Player Web Application

A web-based music player application built with Node.js, Express, and SQLite3. This application allows users to upload, play, search, and manage their music collection.

## Features

- Upload and play music files
- Search songs by name, artist, or album
- CRUD operations for managing songs
- Responsive design with Tailwind CSS
- Real-time search functionality

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

3. Create an `uploads` directory:
   ```bash
   mkdir uploads
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Database Structure

The application uses SQLite3 with the following schema:

```sql
CREATE TABLE songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  album VARCHAR(255),
  file_path VARCHAR(255) NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Technologies Used

- Node.js
- Express.js
- SQLite3
- EJS Templates
- Tailwind CSS
- Multer for file uploads