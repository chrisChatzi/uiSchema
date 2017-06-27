var express = require('express'),
    path = require('path'),
    app = require('express')(),
    http = require('http').Server(app),
    fs = require('fs'),
    httpPort = 8081;

    httpServerFunction();

//send file request
   function httpServerFunction(){
        app.use('/', express.static((path.join(__dirname,'../dist'))));

        app.get('/file', function (req, res){
            fs.readFile('./parent.json', "utf8", read = (err, data) => {
                if(err) throw err;
                else res.send(JSON.parse(data));
            });
        });
        //////////////////////////
        // listening
        http.listen(httpPort, function(){
            console.log('listening on:' + httpPort);
        });
    };
