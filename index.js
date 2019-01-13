var express = require('express')
var app = express()

var fs = require('fs');
var http = require('http');
var request = require('request');
var gifify = require('gifify');
var path = require('path');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/down', function (req, res) {
  const link = (JSON.stringify(req.query.url).slice(1, -1)); //direct mp4/jpg link

  //now download file locally, send download url and destroy file
  const fileName = link.slice(-14);
  const r = request(link);

  r.on('response', (resp) => {
    const stream = resp.pipe(fs.createWriteStream(__dirname + '/downloads/' + fileName));
    stream.on('finish', () => res.download(__dirname + '/downloads/' + fileName, (err) => {
      fs.unlink(__dirname + '/downloads/' + fileName, (err) => {
        if (err) {
          throw err;
        }
      });
    }));
  });
})

app.get('/gif', function (req, res) {
  const link = (JSON.stringify(req.query.url).slice(1, -1)); //direct mp4 link

  //now download file locally, send download url and destroy file
  const fileName = link.slice(-14);
  const r = request(link);

  const gif = fs.createWriteStream(__dirname + '/downloads/' + fileName.slice(1, -4) + '.gif');

  r.on('response', (resp) => {
    const stream = resp.pipe(fs.createWriteStream(__dirname + '/downloads/' + fileName));
    stream.on('finish', () => gifify(__dirname + '/downloads/' + fileName).pipe(gif));
  });

})

app.get('/saveinsta', function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
})

app.listen(5000, '127.0.0.1', function () {
  console.log("Node app is running at localhost:" + app.get('port'))
})