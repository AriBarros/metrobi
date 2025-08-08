# Metrobi Questions Project

This repository contains solutions to different coding questions, organized into dedicated folders inside the `src/questions` directory.  
Each question is self-contained, making it easier to navigate and run individually.

## 📂 Project Structure
```
src/
  questions/
    q3/   ← Contains part of the structure and implementation for Question 3
    q6/   ← Contains the full implementation and structure for Question 6
  tests/  ← Contains automated tests
  utils/  ← Utility functions
```

- **`q3`**: This folder contains both the layout implementation and the application files (`app/`) required to run Question 3 independently (including `index.html`, `main.tsx`, and `App.tsx`).
- **`q6`**: This folder contains scripts and structure for Question 6.

## ▶️ Running the Project

### Install dependencies
```bash
yarn install
```
or
```bash
npm install
```

### Run with Vite (Question 3)
The Vite configuration is set to run the `q3` question app:
```bash
yarn dev
```
or
```bash
npm run dev
```
Then open your browser at:
```
http://localhost:5173
```

## 🧪 Tests
All tests are stored inside the `tests` folder.  
You can run them using:
```bash
yarn test
```
or
```bash
npm test
```

## 📌 Notes
- Each question is isolated to its own folder, which makes it easy to maintain and test independently.
- Make sure you are inside the project root when running commands.
