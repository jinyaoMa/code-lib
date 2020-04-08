var http = require('http')
var fs = require('fs')

var TARGET_TEST_HTML_FILE = './test_JavaScript_jsonp.js.html'; // 修改测试目标

http.createServer().on('request', function (req, res) {
  if (req.url === '/') {
    fs.readFile(TARGET_TEST_HTML_FILE, function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('ERROR')
      } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data)
      }
    })
  } else {
    fs.readFile('.' + req.url, function (err, data) {
      if (err) {
        res.end('ERROR')
      } else {
        res.end(data)
      }
    })
  }
}).listen(3000, function () {
  console.log('http://localhost:3000')
})