const notesContainer = document.querySelector("#app");
const addNoteButton = document.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickyNotes-notes") || "[]");
}

function saveNotes(notes) {
  return localStorage.setItem("stickyNotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.value = content;
  element.placeholder = "empty note";
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });
  element.addEventListener("dblclick", () => {
    const doDelete = confirm("Are you sure you want to delete?");

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteElement = createNoteElement(noteObj.id, noteObj.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObj);
  saveNotes(notes);
}
function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}
function deleteNote(id, element) {
  const notes = getNotes();
  const deletedNote = notes.filter((note) => note.id != id);
  saveNotes(deletedNote);

  notesContainer.removeChild(element);
}
