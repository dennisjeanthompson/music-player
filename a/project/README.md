# Music Web Application

A web-based music player application built with Node.js, Express, and SQLite3. This application allows users to upload, manage, and play music tracks through a clean and intuitive interface.

## Features

- Upload and manage music tracks
- Play music directly in the browser
- CRUD operations for tracks (Create, Read, Update, Delete)
- Responsive design for all devices
- Modern and intuitive user interface

## Technologies Used

- Node.js
- Express.js
- SQLite3
- EJS templating
- Multer for file uploads
- Method Override for RESTful routes

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

3. Create required directories:
   ```bash
   mkdir data
   mkdir src/public/uploads
   ```

4. Start the application:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Deployment

This application is configured for deployment on Render. To deploy:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Render will automatically detect the configuration and deploy the application

## Project Structure

```
web-app/
├── src/
│   ├── controllers/
│   │   └── trackController.js
│   ├── models/
│   │   └── db.js
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   └── uploads/
│   ├── routes/
│   │   └── tracks.js
│   ├── views/
│   │   └── index.ejs
│   └── index.js
├── data/
├── package.json
├── render.yaml
└── README.md
```