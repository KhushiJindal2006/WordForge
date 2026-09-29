# WordForge — Word Puzzle & Challenge Platform

## 📌 Project Overview

**WordForge** is a frontend-based word puzzle and challenge platform developed using HTML, CSS, and JavaScript.

The application allows users to play five-letter word guessing games through different game modes. Players can attempt a Daily Challenge or play unlimited Practice games. The application also provides visual feedback for each guess and keeps track of player performance.

The project is designed to demonstrate frontend development concepts including DOM manipulation, JavaScript logic, responsive CSS, browser storage, CRUD operations, and Git/GitHub version control.

---

## 🎯 Project Objectives

The main objectives of WordForge are to:

- Build an interactive word puzzle game using JavaScript.
- Implement a five-letter word guessing system.
- Allow players a maximum of six attempts per game.
- Provide Daily Challenge and Practice Mode.
- Support both physical and on-screen keyboards.
- Provide visual feedback for guessed letters.
- Store player statistics using browser storage.
- Maintain game history using IndexedDB.
- Provide a dashboard for player statistics.
- Implement CRUD operations for custom puzzles.
- Create a responsive interface for mobile, tablet, and desktop.
- Practice proper Git and GitHub development workflow.

---

## 🎮 Main Features

### 1. Daily Challenge

The Daily Challenge provides a deterministic five-letter word based on the current date.

Players can attempt the daily puzzle within a maximum of six guesses.

The same daily challenge remains available for that date.

### 2. Practice Mode

Practice Mode allows users to play additional word puzzles using randomly selected words from the project's word list.

Unlike the Daily Challenge, Practice Mode can be played multiple times.

### 3. Word Guessing System

Each game uses a five-letter target word.

Players have a maximum of six attempts to guess the target word.

After submitting a guess, each letter receives visual feedback:

- **Green** — the letter is correct and in the correct position.
- **Yellow** — the letter exists in the target word but is in the wrong position.
- **Gray** — the letter does not exist in the target word.

The game also handles repeated letters when evaluating guesses.

### 4. Keyboard Support

Players can enter their guesses using either:

- Physical keyboard
- On-screen keyboard

The on-screen keyboard also displays feedback based on previously submitted guesses.

### 5. Player Statistics

WordForge will maintain player statistics including:

- Games played
- Games won
- Win rate
- Current streak
- Best streak
- Guess distribution from 1 to 6 attempts

### 6. Game History

Completed games will be stored so players can review their previous gameplay.

Game history will contain information such as:

- Date
- Target word
- Game result
- Number of attempts
- Game mode

The dashboard will provide search, filtering, and sorting functionality for game history.

### 7. Custom Puzzle CRUD

WordForge will include custom puzzle management to demonstrate CRUD operations.

Users will be able to:

- **Create** a custom puzzle.
- **Read** saved puzzles.
- **Update** an existing puzzle.
- **Delete** a puzzle.

A custom puzzle may contain:

- Word
- Hint
- Category
- Difficulty

### 8. Dashboard

The dashboard will provide an overview of player performance.

It will display:

- Game statistics
- Win rate
- Current streak
- Best streak
- Guess distribution
- Game history

---

## 💾 Browser Storage

WordForge will use different browser storage technologies for different purposes.

| Storage Technology | Purpose |
|---|---|
| `localStorage` | Player statistics, streaks, and game-related settings |
| Cookies | Small user preferences |
| IndexedDB | Game history and custom puzzle data |

The project will demonstrate browser-based data storage without requiring a backend server.

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Cookies
- IndexedDB
- Git
- GitHub

No external JavaScript libraries or frameworks are used.

---

## 📱 Responsive Design

The interface will be responsive and designed for:

- 📱 Mobile devices
- 📟 Tablets
- 💻 Desktop screens

CSS media queries will be used to adapt the layout and components according to screen size.

---

## 📄 Project Pages

### Game Page

The main game page will contain:

- Daily Challenge
- Word puzzle board
- On-screen keyboard
- Practice Mode
- Game messages

### Dashboard Page

The dashboard page will contain:

- Player statistics
- Win rate
- Streak information
- Guess distribution
- Game history
- Search
- Filtering
- Sorting

### Future Challenge Page

A future version may include a friend challenge feature where users can create and share custom word challenges.

---

## 📁 Project Structure

```text
WordForge/
│
├── assets/
│
├── css/
│   └── style.css
│
├── js/
│   ├── dashboard.js
│   ├── game.js
│   ├── storage.js
│   └── words.js
│
├── .gitignore
├── dashboard.html
├── index.html
└── README.md
```

---

## 🚀 How to Run the Project

### Prerequisites

Before running WordForge, make sure you have:

- A modern web browser such as Google Chrome, Microsoft Edge, or Firefox.
- Visual Studio Code for opening and editing the project.
- Git for cloning and managing the repository.

No additional packages, frameworks, or dependencies are required.

### Running the Project from GitHub

1. Open the WordForge GitHub repository.
2. Copy the repository URL.
3. Open a terminal.
4. Clone the repository using:

```bash
git clone <repository-url>
```

5. Move into the project directory:

```bash
cd WordForge
```

6. Open the project in Visual Studio Code:

```bash
code .
```

7. Open `index.html` in a web browser.

### Running the Project Locally

The project is frontend-only, so no backend server or database server is required.

To run the project:

1. Open the `WordForge` folder in Visual Studio Code.
2. Open `index.html`.
3. Run the file using a browser.
4. The WordForge game page will open in the browser.
5. Use the navigation menu to access the Dashboard.

### Project Navigation

The main pages of the application are:

- `index.html` — Main WordForge game page.
- `dashboard.html` — Player statistics and game history dashboard.

### Recommended Development Setup

For development, it is recommended to use:

- **Visual Studio Code** — Code editor
- **Google Chrome / Microsoft Edge** — Browser testing
- **Git** — Version control
- **GitHub** — Source code repository

---

## 🧪 Testing

The application will be tested for:

- Correct five-letter word validation
- Maximum six attempts
- Correct, present, and absent letter detection
- Duplicate-letter handling
- Physical keyboard input
- On-screen keyboard input
- Daily Challenge functionality
- Practice Mode functionality
- Player statistics
- Browser storage
- Game history
- CRUD operations
- Responsive layouts
- Data persistence after refreshing the browser

---

## 📌 Project Scope

### Current Scope

The main project focuses on:

- Word guessing gameplay
- Daily Challenge
- Practice Mode
- Player statistics
- Game history
- Custom puzzle CRUD
- Dashboard
- Responsive frontend design
- Browser storage

### Future Scope

Possible future improvements include:

- Friend challenges
- Shareable challenge links
- Additional game modes
- Larger word database
- More customization options

---

## 🔐 Data and Privacy

WordForge is a frontend-only application.

Game-related data is stored locally in the user's browser using browser storage technologies. The core application does not require a backend server or user account system.

---

## 🌐 Deployment

After development and testing are completed, WordForge may be deployed using a static hosting service such as GitHub Pages.

---

## 📚 Educational Purpose

WordForge is developed as a Web Fundamentals project to demonstrate practical knowledge of:

- HTML
- CSS
- Responsive web design
- JavaScript
- DOM manipulation
- Event handling
- Browser storage
- CRUD operations
- Git
- GitHub

---

## 👤 Author

**Web Fundamentals Student**

---

## 📜 License

This project is created for educational purposes as part of a Web Fundamentals course.