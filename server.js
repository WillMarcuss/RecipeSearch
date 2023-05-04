const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Serve the index.html file
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  } 
  // Serve the styles.css file
  else if (req.url === '/styles.css') {
    const filePath = path.join(__dirname,'styles.css');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end(`Error loading ${filePath}`);
      }
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    });
  } 
  // Serve the index.js file
  else if (req.url === '/index.js') {
    fs.readFile('index.js', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.js');
      }
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.end(data);
    });
  }

  else if (req.url === '/bg.jpeg') {
    const filePath = path.join(__dirname,'bg.jpeg');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end(`Error loading ${filePath}`);
      }
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.end(data);
    });
  }

  // Return a 404 error for all other requests
  else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

server.listen(3000);
console.log('Server running on port 3000');
