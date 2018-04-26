// console.info('This is a child_process.');

const fs = require('fs');
fs.writeFile('message.txt', 'Hello Node.js', 'utf8', null);