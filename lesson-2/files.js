const fs = require('fs');

// reading file
fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString()); // appending a toString method turns the buffer to string format
});


console.log('last line');

// writing files
fs.writeFile('./docs/blog1.txt', 'hello, world', () => {
    console.log('file was written');
});

fs.writeFile('./docs/blog2.txt', 'hello, again', () => {
    console.log('file was written');
});


// deleting a directory
if (!fs.existsSync('./assets')) {// either creates or delete a folder
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder created');
    });
} else {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder deleted');
    });
}

