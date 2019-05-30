const fs = require('fs');

const getNotes = () => 'Your notes...';

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log('New note saved.');
  } else {
    console.log('Note title already exists. No duplicates allowed.');
  }
};

const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync('notes.json').toString());
  } catch (err) {
    return [];
  }
};

const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes));


module.exports = {
  getNotes,
  addNote
};