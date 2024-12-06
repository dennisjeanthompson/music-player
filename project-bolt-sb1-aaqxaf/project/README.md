# Music Player Web Application

A simple music player web application that allows you to manage and play your favorite songs.

## Features

- Create, Read, Update, and Delete songs
- Play songs with basic audio controls
- Volume control
- Clean and modern dark theme interface
- Responsive design

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

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/src/models` - Database models
- `/src/routes` - API routes
- `/src/db` - Database configuration
- `/src/components` - React components
- `/src/App.tsx` - Main React component

## Technologies Used

- Node.js
- Express
- SQLite3
- React
- Tailwind CSS
- TypeScript

## Adding Songs

1. Click the "Add Song" button
2. Fill in the song details:
   - Title
   - Artist
   - Audio URL (link to an MP3 file)
3. Click "Add Song" to save

## Playing Songs

1. Click the "Play" button on any song in the list
2. Use the audio player controls to:
   - Play/Pause
   - Adjust volume
   - Skip tracks (coming soon)