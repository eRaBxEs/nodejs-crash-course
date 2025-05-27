const fs = require('fs');

// reading file
fs.readFile('./docs/blog12.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString()); // appending a toString method turns the buffer to string format
});


console.log('last line');
// writing files


// directories


// deleting files