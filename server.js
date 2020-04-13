var http = require('http')
var fs = require('fs')
var stylus = require('stylus')

var TARGET_TEST_HTML_FILE = './HTML/template.blog.html'; // 修改测试目标

http.createServer().on('request', function (req, res) {
  try {
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
          if (req.url.endsWith('.styl')) {
            res.setHeader('content-type', 'text/css')

            let result = stylus(data.toString())
              .set('include css', true)
              .render()

            res.end(result)
          } else {
            res.end(data)
          }
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}).listen(3000, function () {
  console.log('http://localhost:3000')
})