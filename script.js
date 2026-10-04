// ==================================================
// QUICKNOTES
// Task 4 - Validation, Delete and Count
// ==================================================


// ---------- 1. Select the HTML elements ----------

const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];


// ---------- Update the note count ----------

function updateCount() {
  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${notes.length} notes.`;
  }
}


// ----------Render notes on the page ----------

function render() {
  list.replaceChildren();

  notes.forEach((note) => {
    const li = document.createElement("li");

    li.classList.add("note");
    li.classList.add(`category-${note.category}`);

    const text = document.createElement("span");
    text.classList.add("note-text");
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.classList.add("note-meta");

    const details = document.createElement("span");
    details.textContent = `${note.category} • ${note.createdAt}`;

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
    });

    meta.appendChild(details);
    meta.appendChild(deleteButton);

    li.appendChild(text);
    li.appendChild(meta);

    list.appendChild(li);
  });

  updateCount();
}


// ---------- Add a note ----------

function addNote(text, category) {
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);

  render();
}


// ---------- Delete a note ----------

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);

  render();
}


// ---------- Handle form submission ----------

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  const category = categoryInput.value;

  // Check for an empty note
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // Check for notes longer than 200 characters
  if (text.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear any previous error
  errorMessage.textContent = "";

  // Add the valid note
  addNote(text, category);

  // Clear the form
  input.value = "";
  input.focus();
});


render();