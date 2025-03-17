[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ixLrLXsm)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=16360174)

# Project IEEE Interactive Website

## Overview
IEEE Spokane Section Interactive Website project developed in a modern, user-friendly web platform to replace an outdated site that lacked functionality and design coherence using frameworks React.js, Node.js/Express, Firebase and a backend database. 

## Table of Contents

- [IEEE Interactive Website](#project)
  - [Prerequisites](#prerequisites)
  - [System Architecture](#system-architecture)
  - [System Modules](#system-modules)
  - [Deployment](#deployment)
  - [Installation](#installation)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Testing Procedures](#testing-procedures)
  - [Contributing Guidelines](#contributing-guidelines)

## Prerequisites

- React
- Node
- Express
- Firebase
- MySQL Database
- Prettier

## System Architecture

### Frontend Architecture

The frontend is built with React and follows a component-based architecture:
1. App.jsx: The main component that sets up routing and global state.
2. Pages/: Contains page-level components that represent different routes in the application.
3. Components/: Contains reusable UI components used across multiple pages.
4. api/: Contains API integration code using Axios.
5. cloudinary/: Contains configuration for Cloudinary image uploads.

### Backend Architecture

The backend follows a standard Express.js architecture:

1. server.js: The entry point that sets up the Express server, middleware, and routes.
2. routes/: Contains route definitions that map API endpoints to controller functions.
3. controllers/: Contains the business logic for handling API requests.
4. config/: Contains configuration files, including database connection setup.

## System Modules

### Backend Modules (Node.js/Express)
- Routes: Defines API endpoints (e.g., /events, /officers).
- Controllers: Handles business logic for API requests.
- Database Models: Defines how data is structured and stored in MySQL.
- Middleware: Manages authentication, logging, and error handling.

### Frontend Modules (React.js/Firebase)
- Pages: Different UI pages like the homepage, events page, and admin dashboard.
- Components: Reusable UI components and generalizing the entire website (e.g., buttons, forms, modals).
- API Integration: Handles requests to the backend (e.g., fetching events and officer details).
- State Management: Manages application state using React Context.
- Firebase: Manages Firebase API calls for Login

### Database Modules (MySQL)
- Tables: Stores data for events, officers, and other site functionalities.
- Queries: SQL scripts for inserting, updating, deleting, and retrieving data.

## Deployment

### Frontend Deployment: Netlify
The frontend is deployed to Netlify. The configuration is in Frontend/netlify.html

### Backend Deployment: Railway

The backend is configured to deploy to Railway. The database connection is already configured for
the production environment.

Railway will automatically detect the Node.js application, use the start script defined in package.json and automatically backup every 7 days.

## Installation

1. Install es7-react-js-snippets on VS Code via Extensions for easier shortcuts
2. Clone repository:

```powershell
git clone https://github.com/Sanmeet-EWU/cscd-488-490-project-ieee-interactive-website.git
```

4. Navigate to the project directory website and check if react and node are up to date

```powershell
cd ~/cscd-488-490-project-ieee-interactive-website
React (version 10.9.0): npm -v
Node (version 20.10.0): node -v
```

## Frontend

1. Make sure you have installed the react-scripts package before running it:

```powershell
npm install
```

2. **Running webpage**: To run web page application, navigate to the project directory:

```powershell
cd ./Frontend
```

And run:

```powershell
npm start
```

You can exit application by ctlr c

Note: Saving the file will update the webpage of what you did

Note: Deployed website is on local host 3000. When running development server, please use different local host

3. **Firebase**: Contact IEEE Spokane Administrator to give you access to the firebase

### Backend

1. Make sure you have installed cloudinary before running it in the Backend directory:

```powershell
npm install cloudinary
```

2. **Running server**:

```powershell
npm run dev
```

3. **Localhost**: Link to the server is http://localhost:3001

4. Check in phpmyadmin for officers and events tables for testing purposes
```powershell
http://localhost/phpmyadmin/
```

## Testing Procedures

### Frontend Testing
The project uses Jest and React Testing Library for frontend testing

To run test:
```powershell
cd ./Frontend
npm test
```
When writing tests for React components:
1. Focus on testing behavior, not implementation details
2. Use React Testing Library's queries to find elements
3. Test user interactions using fireEvent or userEvent

### Backend Testing
Currently, the backend does not have automated tests. This is an area for future improvement.

Recommended approach for adding backend tests:
1. Use Jest for the testing framework.
2. Use Supertest for API endpoint testing.
3. Create a separate test database for integration tests.

## Contributing Guidelines

1. **Creating your branch**: Please create your own branch

2. **Switching to your branch**: Avoid pushing it to the main branch, switch to your branch:

```powershell
git checkout <branch-name>
Or use VS code bottom left theres main, click and change it to your branch
```

3. **Formatting Code**: Please use Prettier to format all of the code before pushing your changes
```powershell
npx prettier --write .
```

4. **Make Your Changes**: Push your changes to your forked repository

```powershell
git commit -m "<commit-message>"
Or use VS code source
```

5. **Push Your Changes**: Push your changes to your forked repository

```powershell
git push origin <branch-name> # name format for your branch: development_firstName_lastName
Or use VS code source
```

6. **Pulling Someones Branch**: Pull someones change to your branch

```powershell
git pull <branch-name>
```

7. **Create a Pull Request**: Go to your forked repository on GitHub and create a new pull request from your branch.

If the pull request is approved, it will be merged into the main codebase. Please ensure that your code passes your tests and works properly before submitting a pull request

8. **Updating Website**: Create a pull request from your branch to main

Merging changes to main will update the website. Please ensure that no errors occur before merging
