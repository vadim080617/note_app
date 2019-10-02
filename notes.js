const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    const checkNoteWithSameTitle = notes.find (el => el.title === title);
    if (!checkNoteWithSameTitle) {
        notes.push({
            title,
            body
        });

        saveNotes(notes);
        logger('New note added');
    } else {
        logger(`Note with title "${title}", already exists.`, 'red');
    }
};

const removeNote = (title) => {
    let notes = loadNotes();

    const checkNoteWithSameTitle = notes.find (el => el.title === title);
    if (!checkNoteWithSameTitle) {
        logger('There is not note with this title.', 'red');
    } else {
        notes = notes.filter ( el => el.title !== title);
        saveNotes(notes);
        logger('Note removed.');
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON.toString());
    } catch (e) {
        return [];
    }
};

const listNotes = () => {
    const notes = loadNotes();
    logger('Your notes:', 'yellow');
    notes.forEach(el => {
        logger(el.title, 'cyan');
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(el => el.title === title);
    if (note) {
        logger(note.title, 'cyan');
        logger(note.body, 'gray');
    } else {
        logger('Note with this title doesnt exist.');
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const logger = (msg, color = 'green') => {
    console.log(chalk[color].inverse(msg));
};

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}