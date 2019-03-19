var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"
// mongoClient.connect(url, function(err, db){
//     if(err) throw err
//     var dbo = db.db("lab1")
//     dbo.createCollection("students", function(err, res){
//             if(err) throw err 
//             console.log("Collection create")
//             db.close 
//             var obj = [
//             {
//             "id" : 1,
//             "firstname" : "Bob",
//             "lastname" : "Cat",
//             "age" : 21,
//             "major" : "Math"
//             },
//             {
//             "id" : 2,
//             "firstname" : "Tom",
//             "lastname" : "Cat",
//             "age" : 18,
//             "major" : "Science"
//             },
//             {
//             "id" : 3,
//             "firstname" : "Marry",
//             "lastname" : "Lamb",
//             "age" : 19,
//             "major" : "Social Study"
//             },
//             {
//             "id" : 4,
//             "firstname" : "Linda",
//             "lastname" : "Lamb",
//             "age" : 21,
//             "major" : "IT"
//             }
//         ]
//         dbo.collection("students").insertMany(obj, function(err, res){  
//         }) 
//     })
// })

var express = require('express')
var fs = require('fs')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/getUsers', function(req,res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("lab1");
        dbo.collection("students").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          
          res.end(JSON.stringify(result))
          db.close();
        });
      });
})

app.get('/getUsers/:id', function(req,res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("lab1");
        dbo.collection("students").find({id:parseInt(req.params.id)}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          
          res.end(JSON.stringify(result))
          db.close();
        });
      });
})

app.post('/addUser', function(req,res){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("lab1");
        var myobj = req.body
        dbo.collection("students").insertOne(myobj, function(err, result) {
          if (err) throw err;
          console.log("1 document inserted");
          res.end(JSON.stringify(result))
          db.close();
        });
      });
})

var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Application run at http://%s:%s", host, port)
})
//routing.listen(8081)