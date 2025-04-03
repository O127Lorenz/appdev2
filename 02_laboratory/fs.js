const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
  } else {
    console.log('File content:', data);
  }
});


fs.writeFile('newfile.txt', 'Hello, this is a new file!', (err) => {
  if (err) {
    console.error('Error creating file:', err);
  } else {
    console.log('File created and data written successfully!');
  }
});




fs.appendFile('existingfile.txt', '\nAppended text', (err) => {
  if (err) {
    console.error('Error appending to file:', err);
  } else {
    console.log('Data appended successfully!');
  }
});



fs.unlink('newfile.txt', (err) => {
  if (err) {
    console.error('Error deleting file:', err);
  } else {
    console.log('File deleted successfully!');
  }
});
