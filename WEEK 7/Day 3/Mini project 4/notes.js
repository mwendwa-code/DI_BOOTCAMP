const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const filePath = path.join(__dirname, 'notes.json');

function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf8');
  }
}

function loadNotes() {
  ensureFile();

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const notes = JSON.parse(data);
    return Array.isArray(notes) ? notes : [];
  } catch (error) {
    return [];
  }
}

function saveNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2), 'utf8');
}

function addNote(title, body) {
  const notes = loadNotes();
  const existingNote = _.find(notes, (note) => note.title.toLowerCase() === title.toLowerCase());

  if (existingNote) {
    return null;
  }

  const note = { title, body };
  notes.push(note);
  saveNotes(notes);
  return note;
}

function getAllNotes() {
  return loadNotes();
}

function readNote(title) {
  const notes = loadNotes();
  return _.find(notes, (note) => note.title.toLowerCase() === title.toLowerCase()) || null;
}

function removeNote(title) {
  const notes = loadNotes();
  const index = _.findIndex(notes, (note) => note.title.toLowerCase() === title.toLowerCase());

  if (index === -1) {
    return false;
  }

  notes.splice(index, 1);
  saveNotes(notes);
  return true;
}

module.exports = {
  addNote,
  getAllNotes,
  readNote,
  removeNote
};
