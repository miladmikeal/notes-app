const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes...';

/**
 * Adds note to notes.json file. 
 * params: title, body
 * return: n/a
 */
const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse('New note saved.'));
  } else {
    console.log(chalk.red.inverse("Error:") + ' Note title already exists. No duplicates allowed.');
  }
};

/**
 * Returns list of notes.
 * params: n/a
 * return: n/a
 */
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bold("Your notes:"));
  notes.forEach(note => {
    console.log(note.title);
  });
};

/**
 * Removes note with specified title from notes.json file.
 * params: title
 * return: n/a
 */
const removeNote = (title) => {
  const notes = loadNotes();

  const filteredNotes = notes.filter(note => note.title !== title);

  if (filteredNotes.length < notes.length) {
    console.log(chalk.green.inverse("Note removed"));
    saveNotes(filteredNotes);
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

/**
 * Reads and parses notes from notes.json file.
 * params: n/a
 * returns: parsed notes or empty array
 */
const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync('notes.json').toString());
  } catch (err) {
    return [];
  }
};

/**
 * Saves the stringifies notes to notes.json file.
 * params: notes
 * returns: n/a
 */
const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes));


module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes
};