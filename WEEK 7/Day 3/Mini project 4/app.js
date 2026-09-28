const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { addNote, getAllNotes, readNote, removeNote } = require('./notes');

const app = yargs(hideBin(process.argv))
  .command(
    'add',
    'Add a note',
    {
      title: { type: 'string', demandOption: true },
      body: { type: 'string', demandOption: true }
    },
    (argv) => {
      const note = addNote(argv.title, argv.body);
      if (!note) {
        console.log('Note already exists');
        return;
      }
      console.log('Note added successfully');
    }
  )
  .command('list', 'List all notes', () => {
    const notes = getAllNotes();

    if (notes.length === 0) {
      console.log('No notes found');
      return;
    }

    notes.forEach((note) => {
      console.log(`- ${note.title}: ${note.body}`);
    });
  })
  .command(
    'read',
    'Read a note',
    {
      title: { type: 'string', demandOption: true }
    },
    (argv) => {
      const note = readNote(argv.title);

      if (!note) {
        console.log('Note not found');
        return;
      }

      console.log(`Title: ${note.title}`);
      console.log(`Body: ${note.body}`);
    }
  )
  .command(
    'remove',
    'Remove a note',
    {
      title: { type: 'string', demandOption: true }
    },
    (argv) => {
      const removed = removeNote(argv.title);
      if (!removed) {
        console.log('Note not found');
        return;
      }
      console.log('Note removed successfully');
    }
  )
  .help()
  .alias('help', 'h');

const parsed = app.parse();
const command = parsed._[0];

if (!command || !['add', 'list', 'read', 'remove'].includes(command)) {
  console.log('command not recognized');
}
