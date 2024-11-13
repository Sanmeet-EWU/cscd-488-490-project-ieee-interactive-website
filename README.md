[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ixLrLXsm)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=16360174)

Note: I will put the models, pdfs, figma in a separate folder on our branches

# Project IEEE Interactive Website

## Table of Contents
- [IEEE Interactive Website](#project)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Web](#web)
  - [Contributing](#contributing)


### Prerequisites
- React
- TailWindCSS
- Node

### Installation

1. Install es7-react-js-snippets on VS Code via Extensions for easier shortcuts
2. Install TailwindCSS IntelliSense on VS Code via Extensions for easier reading CSS code and highlighting
3. Clone repository:

```powershell
git clone https://github.com/Sanmeet-EWU/cscd-488-490-project-ieee-interactive-website.git
```

4. Navigate to the project directory website and check if react and node are up to date
```powershell
cd ~/cscd-488-490-project-ieee-interactive-website/website
React (version 10.9.0): npm -v
Node (version 20.10.0): node -v
```

### Web
Make sure you have installed the react-scripts package before running it:
```powershell
npm install
```

To run web page application, navigate to the project directory and run:

```powershell
npm start
```

You can exit application by ctlr c

Saving the file will update the webpage of what you did

## Contributing
1. **Switching to your branch**: Avoid pushing it to the main branch, switch to your branch:
```powershell
git checkout <branch-name>
Or use VS code bottom left theres main, click and change it to your branch
```
1. **Make Your Changes**: Push your changes to your forked repository
```powershell
git commit -m "<commit-message>"
Or use VS code source
```

2. **Push Your Changes**: Push your changes to your forked repository
```powershell
git push origin <branch-name> # name format for your branch: development_firstName_lastName
Or use VS code source
```

3. **Create a Pull Request**: Go to your forked repository on GitHub and create a new pull request from your branch.

If the pull request is approved, it will be merged into the main codebase. Please ensure that your code passes your tests and works properly before submitting a pull request
