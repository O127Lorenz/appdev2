const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const EventEmitter = require('events');

class FileEventEmitter extends EventEmitter {}
const fileEventEmitter = new FileEventEmitter();

fileEventEmitter.on('fileAction', (action, filename) => {
    console.log(`File ${action}: ${filename}`);
});

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    const filePath = path.join(__dirname, query.filename || 'default.txt');

    if (pathname === '/create') {
        fs.writeFile(filePath, 'Hello, this is a new file.', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error creating file');
            }
            fileEventEmitter.emit('fileAction', 'created', query.filename);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File created successfully');
        });
    } else if (pathname === '/read') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error reading file');
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    } else if (pathname === '/update') {
        fs.appendFile(filePath, '\nAppended content.', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error updating file');
            }
            fileEventEmitter.emit('fileAction', 'updated', query.filename);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File updated successfully');
        });
    } else if (pathname === '/delete') {
        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error deleting file');
            }
            fileEventEmitter.emit('fileAction', 'deleted', query.filename);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File deleted successfully');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Invalid route');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
