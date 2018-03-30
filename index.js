var express = require('express')
var app = express()

var fs = require('fs');
var http = require('http');
var request = require('request');
// var gifify = require('gifify');
var path = require('path');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/video', function(req, res){
  const link = (JSON.stringify(req.query.url).slice(1,-1));   //direct mp4 link
  console.log(link);

  //now download file locally, send download url and destroy file
  const r = request(link);
  r.on('response', (res)=>{
    res.pipe(fs.createWriteStream(__dirname + '/downloads/' + `${Math.floor(Math.random() * Math.floor(9999))}.mp4`));
  })

})

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
