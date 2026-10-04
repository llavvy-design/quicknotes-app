// ==================================================
// QUICKNOTES
// Task 5 + Live Character Counter
// ==================================================


// ---------- 1. Select the HTML elements ----------

const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const charCounter = document.querySelector("#char-counter");

const STORAGE_KEY = "quicknotes-notes";


// ---------- Load saved notes ----------

let notes = loadNotes();

function loadNotes() {
  const savedNotes = localStorage.getItem(STORAGE_KEY);

  if (!savedNotes) {
    return [];
  }

  try {
    return JSON.parse(savedNotes);
  } catch (error) {
    console.error("Could not load saved notes:", error);
    return [];
  }
}


// ----------Save notes ----------

function saveNotes() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notes)
  );
}


// ----------Character counter ----------

function updateCharacterCounter() {
  const characterCount = input.value.trim().length;

  charCounter.textContent =
    `${characterCount} / 200 characters`;

  charCounter.classList.remove("warning", "over");

  if (characterCount > 200) {
    charCounter.classList.add("over");
  } else if (characterCount > 180) {
    charCounter.classList.add("warning");
  }
}


// ----------Update the note count ----------

function updateCount() {
  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent =
      `You have ${notes.length} notes.`;
  }
}


// ---------- Render notes ----------

function render() {
  const searchTerm =
    searchInput.value.trim().toLowerCase();

  list.replaceChildren();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  if (
    filteredNotes.length === 0 &&
    notes.length > 0 &&
    searchTerm !== ""
  ) {
    const message = document.createElement("li");

    message.textContent =
      "No notes match your search.";

    list.appendChild(message);
  } else {
    filteredNotes.forEach((note) => {
      const li = document.createElement("li");

      li.classList.add("note");
      li.classList.add(`category-${note.category}`);

      const text = document.createElement("span");

      text.classList.add("note-text");
      text.textContent = note.text;

      const meta = document.createElement("div");

      meta.classList.add("note-meta");

      const details = document.createElement("span");

      details.textContent =
        `${note.category} • ${note.createdAt}`;

      const deleteButton =
        document.createElement("button");

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
  }

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

  saveNotes();
  render();
}


// ---------- Delete a note ----------

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);

  saveNotes();
  render();
}


// ----------  Form submission and validation ----------

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  const category = categoryInput.value;

  if (text === "") {
    errorMessage.textContent =
      "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  addNote(text, category);

  input.value = "";

  updateCharacterCounter();

  input.focus();
});


// ---------- Live character counter ----------

input.addEventListener("input", () => {
  updateCharacterCounter();
});


// ---------- Search ----------

searchInput.addEventListener("input", () => {
  render();
});


updateCharacterCounter();
render();