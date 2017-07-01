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
                    let dummyCategory = new categoryModel({
                        contentType: "content",
                        id: "wei4oinr-6546-4dewf-87ae-8d91abffe242",
                        properties: "props",
                        createdAt: new Date(),
                        offers: [
                            // { id:"c482b0fb-ca01-4200-ba10-61a16f8597ae" },
                            // { id:"c482b234-3a01-4500-ba10-61a16f8597ae" }
                        ]
                    });
                    dummyCategory.save(function(err) {
                      if (err) throw err;
                      console.log('User saved successfully!');
                    });
                httpServerFunction();
            });
            mongoose.connect(mongoPath);
        }());

//send file request
   function httpServerFunction(){
        app.use('/', express.static((path.join(__dirname,'../dist'))));
        //get all categories
        app.get('/categories', function (req, res){
            categoryModel.find({}, function(err, result) {
                if (err) throw err;
                res.send(JSON.stringify({ data : result}))
            });
        });

        app.use(bodyParser.json({limit: "50mb"}));
        app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))
        // get product by id
        app.post('/product', function (req, res){
            productModel.find({ id : req.body.id }, function(err, result) {
                if (err) throw err;
                res.send(JSON.stringify({ data : result}))
            });
        });
        // delete product
        app.post('/productDel', function (req, res){
            productModel.findOneAndRemove({ id : req.body.id }, function(err, product) {
                if (err) throw err;
                categoryModel.findOneAndUpdate({id: req.body.catId}, {$pull: {offers: {id : req.body.id}}}, function(err, data){
                    if(err) throw err
                    res.send(JSON.stringify({ data : true }))
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
        // new product
        app.post('/productNew', function (req, res){
            productModel.find({id : req.body.prodId}, function(err, ex) {
                if (err) throw err;
                if(ex.length <= 0){
                    let newProduct = new productModel(req.body.data)
                    newProduct.save(function(err, dataProd){
                        if(err) throw err
                        categoryModel.findOneAndUpdate({id: req.body.catId}, { $push : {offers: {id:req.body.prodId} } }, {new: true}, function(err, data){
                            if(err) throw err
                            res.send(JSON.stringify({ data : data }))
                        });
                    });
                }else res.send(JSON.stringify({ data : false }))
            });

        });
        //////////////////////////
        // listening
        http.listen(httpPort, function(){
            console.log('listening on:' + httpPort);
        });
    };
