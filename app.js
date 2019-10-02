const { addNote, removeNote, listNotes, readNote } = require('./notes');
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Adding a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        const { title, body } = argv;
        addNote(title, body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        const { title } = argv;
        removeNote(title);
    }
});

yargs.command({
    command: 'list',
    describe: 'Show notes',
    handler() {
        listNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        const { title } = argv;
        readNote(title);
    }
});

yargs.parse();