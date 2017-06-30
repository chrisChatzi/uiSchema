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
                    offers: [{ id:String }]
                });
                var productSchema = new Schema({
                       "contentType":String,
                       "id":String,
                       "properties":String,
                       "createdAt":Date,
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
                //////
                    let y = new categoryModel({
                        contentType: "String",
                        id: "String",
                        properties: "String",
                        createdAt: new Date(),
                        offers: [{ id:"String" }]
                    });
                    // y.save(function(err) {
                    //   if (err) throw err;
                    //   console.log('User saved successfully!');
                    // });
                    let x = new productModel({
                        "contentType":"String",
                        "id":"String",
                        "properties":"String",
                        "createdAt":new Date(),
                        "offer":[
                           {
                              "properties":{
                                 "name":"String",
                                 "category":"String",
                                 "description":"String",
                                 "productName":"String",
                                 "retailerUrl":"String",
                                 "productBrand":"String",
                                 "reducedPrice":{
                                    "amount":55,
                                    "currencyCode":"String"
                                 },
                                 "originalPrice":{
                                    "amount":77,
                                    "currencyCode":"String"
                                 },
                                 "productImagePointer":{
                                    "itemName":"String"
                                 }
                              },
                              "createdAt":new Date()
                           }
                        ]
                    });
                    // x.save(function(err) {
                    //   if (err) throw err;
                    //   console.log('User saved successfully!');
                    // });
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

        app.use(bodyParser.json({limit: "50mb"}));
        app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))

        app.post('/product', function (req, res){
            productModel.find({ id : req.body.id }, function(err, result) {
                if (err) throw err;
                res.send(JSON.stringify({ data : result}))
            });
        });
        // delete product
        app.post('/productDel', function (req, res){
            productModel.find({ id : req.body.id }, function(err, result) {
                if (err) throw err;
                productModel.remove(function(err) {
                    if (err) throw err;
                    categoryModel.findOneAndUpdate({id: req.body.catId}, {$pull: {offers: {id : req.body.id}}}, function(err, data){
                        if(err) throw err
                        res.send(JSON.stringify({ data : true }))
                    });
                });
            });
        });
        // update product
        app.post('/productUpdate', function (req, res){
            productModel.findOneAndUpdate({id: req.body.prodId}, { $set : req.body.data }, {new: true}, function(err, data){
                if(err) throw err
                res.send(JSON.stringify({ data : data }))
            });
        });
        //////////////////////////
        // listening
        http.listen(httpPort, function(){
            console.log('listening on:' + httpPort);
        });
    };
