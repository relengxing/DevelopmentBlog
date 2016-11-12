const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n' + message);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

var message
http.get('http://127.0.0.1:9090/message?page=1', function (req, res) {
    var html = '';
    req.on('data', function (data) {
        html += data;
    });
    req.on('end', function () {
        message = html;
        console.info(html);
    });
});
