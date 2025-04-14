# Sudoku Game

A web-based Sudoku game with puzzle generation and automatic solving capabilities.

## Overview

This Sudoku game is built using HTML, CSS, and JavaScript. It features a 9x9 grid where players can solve Sudoku puzzles of varying difficulty. The game includes functionality to generate new puzzles and an automatic solver for when you get stuck.

## Features

- **Interactive 9x9 Sudoku Grid**: Classic Sudoku layout with proper borders highlighting 3x3 subgrids
- **Puzzle Generation**: Create new puzzles with the click of a button
- **Automatic Solver**: Stuck on a puzzle? Use the solver to see the solution
- **Difficulty Levels**: Puzzles can be generated at different difficulty levels (easy, medium, hard)
- **User Input**: Players can manually enter numbers into the grid
- **Visual Feedback**: Pre-filled numbers appear in red, while user entries appear in green

## Files Included

- **index.html**: The main HTML structure for the Sudoku grid and buttons
- **style.css**: CSS styling for the Sudoku grid and user interface
- **script.js**: JavaScript code that handles game logic, API calls, and solving algorithms

## How to Play

1. Open `index.html` in your web browser
2. Click "Get New Puzzle" to generate a new Sudoku puzzle
3. Click on empty cells to enter numbers (1-9)
4. If you get stuck, click "Solve" to see the complete solution

## Technical Details

### Puzzle Generation

The game uses the [Sugoku API](https://sugoku.herokuapp.com/) to generate new puzzles. If the API is unavailable, the game falls back to generating a simple random puzzle locally.

### Solving Algorithm

The solver uses a backtracking algorithm to find the solution:
1. Find an empty cell
2. Try placing digits 1-9
3. Check if the digit is valid in that position
4. If valid, recursively try to fill the rest of the grid
5. If invalid or the recursive call fails, backtrack and try the next number

### Grid Structure

The Sudoku grid uses a series of CSS classes to create appropriate borders:
- `lsb`: Left solid border
- `rsb`: Right solid border
- `tsb`: Top solid border
- `bsb`: Bottom solid border
- `ldb`: Left dotted border
- `tdb`: Top dotted border

## Browser Compatibility

This game works best in modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Future Improvements

Potential enhancements for future versions:
- Timer functionality
- Difficulty selection UI
- Score tracking
- Hint system
- Mobile-responsive design
- Local storage to save game progress

