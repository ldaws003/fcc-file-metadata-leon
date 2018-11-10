'use strict';

var express = require('express');
var cors = require('cors');



// require and use "multer"...
var multer = require('multer');
var app = express();
var storage = multer.memoryStorage();
var upload = multer({storage: storage, limits: {fileSize: 30000000}});

                    



app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
  var fileName = req.file.originalname;
  var fileType = req.file.mimetype;
  var fileSize = req.file.size +" bytes";
  
  res.json({
    "file name": fileName,
    "file type": fileType,
    "filesize": fileSize
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
