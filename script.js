const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");


let notes = [];


// ---------- Render notes on the page ----------

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

    details.textContent =
      `${note.category} • ${note.createdAt}`;

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    li.appendChild(text);
    li.appendChild(meta);

    meta.appendChild(details);
    meta.appendChild(deleteButton);

    list.appendChild(li);
  });

  updateCount();
}


// ---------- Update the note count ----------

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


// ----------Add a note ----------

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


// ----------Listen for form submission ----------

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  const category = categoryInput.value;

  addNote(text, category);

  input.value = "";
  input.focus();
});


render();