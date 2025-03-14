[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ixLrLXsm)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=16360174)

# Project IEEE Interactive Website

## Overview
IEEE Spokane Section Interactive Website project developed in a modern, user-friendly web platform to replace an outdated site that lacked functionality and design coherence using frameworks React.js, Node.js/Express and a backend database. 


## Table of Contents

- [IEEE Interactive Website](#project)
  - [Prerequisites](#prerequisites)
  - [Deployment](#deployment)
  - [Installation](#installation)
  - [Backend](#backend)
  - [Web](#web)
  - [Contributing](#contributing)

### Prerequisites

- React
- Node
- MySQL Database

### Deployment

- Netlify
- Railway

### Installation

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

### Backend

1. Make sure you are on the right directory before running it:

```powershell
cd ./Backend
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

### Web

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

## Contributing

1. **Switching to your branch**: Avoid pushing it to the main branch, switch to your branch:

```powershell
git checkout <branch-name>
Or use VS code bottom left theres main, click and change it to your branch
```

2. **Make Your Changes**: Push your changes to your forked repository

```powershell
git commit -m "<commit-message>"
Or use VS code source
```

3. **Push Your Changes**: Push your changes to your forked repository

```powershell
git push origin <branch-name> # name format for your branch: development_firstName_lastName
Or use VS code source
```

4. **Pulling Someones Branch**: Pull someones change to your branch

```powershell
git pull <branch-name>
```

5. **Create a Pull Request**: Go to your forked repository on GitHub and create a new pull request from your branch.

If the pull request is approved, it will be merged into the main codebase. Please ensure that your code passes your tests and works properly before submitting a pull request

6. **Updating Website**: Create a pull request from your branch to main

Merging changes to main will update the website. Please ensure that no errors occur before merging
