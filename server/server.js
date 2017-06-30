var express = require('express'),
    path = require('path'),
    app = require('express')(),
    http = require('http').Server(app),
    mongoose = require('mongoose'),
    mongodb = mongoose.connection,
    mongoPath = "mongodb://localhost:27017/uiSchema",
    bodyParser = require('body-parser'),
    fs = require('fs'),
    httpPort = 8081;


    var categoryModel = "", productModel = "";
    // x.save(function(err) {
    //   if (err) throw err;
    //   console.log('User saved successfully!');
    // });

    // mongoDB init
        var mongoDBFunction = (function(){
            mongodb.on('error', function(){
                console.log("Error connecting to the mongo DB");
            });
            mongodb.once('open', function(){
                var m = mongoPath.substring(mongoPath.lastIndexOf('/')+1, mongoPath.length);
                console.log("Connected to mongoDB: '"+m+"'");
                var Schema = mongoose.Schema;
                var categorySchema = new Schema({
                    contentType: String,
                    id: String,
                    properties: String,
                    createdAt: Date,
                    offers: [{
                        id:String,
                        properties:{
                           name:String,
                           reducedPrice:{
                              amount:Number,
                              currencyCode:String
                           },
                           originalPrice:{
                              amount:Number,
                              currencyCode:String
                           },
                           productImagePointer:{
                              itemName:String
                           }
                        },
                        createdAt:Date
                    }]
                });
                var productSchema = new Schema({
                       "contentType":String,
                       "id":String,
                       "properties":String,
                       "createdAt":String,
                       "offer":[
                          {
                             "properties":{
                                "name":String,
                                "category":String,
                                "description":String,
                                "productName":String,
                                "retailerUrl":String,
                                "productBrand":String,
                                "reducedPrice":{
                                   "amount":Number,
                                   "currencyCode":String
                                },
                                "originalPrice":{
                                   "amount":Number,
                                   "currencyCode":String
                                },
                                "productImagePointer":{
                                   "itemName":String
                                }
                             },
                             "createdAt":Date
                          }
                       ]
                });
                categoryModel = mongoose.model('categoryModel', categorySchema);
                productModel = mongoose.model('productModel', productSchema);
                httpServerFunction();
            });
            mongoose.connect(mongoPath);
        }());

//send file request
   function httpServerFunction(){
        app.use('/', express.static((path.join(__dirname,'../dist'))));

        app.get('/categories', function (req, res){
            categoryModel.find({}, function(err, result) {
                if (err) throw err;
                res.send(JSON.stringify({ data : result}))
            });
        });
        //////////////////////////
        // listening
        http.listen(httpPort, function(){
            console.log('listening on:' + httpPort);
        });
    };
