sessions# StudyVault

StudyVault is a full-stack web application designed to help students organize and track their study sessions. Users can create an account, log in securely, and manage their own study-session information through a simple dashboard.

## Features

- User registration
- User login and logout
- Secure user authentication
- Create study sessions
- View saved study sessions
- Edit existing study sessions
- Delete study sessions
- Track planned and completed sessions
- View total, completed, and planned session counts
- User-specific data storage
- Persistent data stored in Supabase

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend and Database
- Supabase
- Supabase Authentication
- PostgreSQL database
- Row Level Security (RLS)

### Development and Deployment
- Visual Studio Code
- Git
- GitHub
- Netlify

## Database

StudyVault uses a Supabase PostgreSQL database to store study sessions. Each study session contains:

- Course
- Topic
- Study date
- Duration
- Status
- Notes

Each study session is associated with the authenticated user's ID.

Row Level Security policies are used so authenticated users can create, view, update, and delete only their own study-session data.

## Authentication

StudyVault uses Supabase Authentication. Users can register for an account, log in, and log out. Study-session data is connected to the authenticated user.

## CRUD Operations

StudyVault supports all four CRUD operations:

- Create - Add a new study session
- Read - View saved study sessions
- Update - Edit an existing study session
- Delete - Remove a study session

## Local Setup

1. Clone the repository.

2. Install the project dependencies:

   npm install

3. Create a `.env` file in the project root.

4. Add the following Supabase environment variables:

   VITE_SUPABASE_URL=your_supabase_project_url

   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

5. Start the development server:

   npm run dev

6. Open the local URL provided by Vite in your browser.

## Live Application


StudyVault is deployed on Netlify and can be accessed here:

https://gleeful-trifle-4ff159.netlify.app

## Author

Fergie Bermudez