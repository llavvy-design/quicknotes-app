# QuickNotes

QuickNotes is a simple note-taking web application built with HTML, CSS and JavaScript. It allows users to create notes, organize them into Personal, Work and Study categories, search through saved notes and delete notes when they are no longer needed. Notes are stored in the browser using localStorage so they remain available after refreshing the page.

## Features

- Add notes with a category
- Categories: Personal, Work, Study
- Live character counter
- Validate notes from 1 to 200 characters
- Delete individual notes
- Search notes without case sensitivity
- Display the number of saved notes
- Show the note category and creation date
- Save notes with localStorage
- Responsive layout for smaller screens

## How to Run Locally

1. Clone the repository:

    git clone https://github.com/llavvy-design/quicknotes-app.git

2. Open the project folder in Visual Studio Code or any IDE you have

3. Open `index.html` with Live Server

4. Use the QuickNotes interface in your browser.

## Project Structure

    quicknotes-app/
    │
    ├── index.html
    ├── style.css
    ├── script.js
    └── README.md

## What I Learned

- I learned how to use HTML to create semantic page structure, forms and accessible labels.
- I learned how CSS Flexbox, responsive layouts and category classes can improve the appearance of a web application.
- I learned how JavaScript can manage arrays of objects, validate input and respond to user events.
- I learned how the DOM can be updated dynamically using `createElement`, `textContent` and also event listeners.
- I learned how `localStorage` and JSON can be used to persist application data in the browser.
- I learned how event listeners can be used to create interactive features such as search, deletion and a live character counter.