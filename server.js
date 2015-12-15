var cheerio = require('cheerio');
var	fs = require('fs');
var	tabletojson = require('tabletojson');
var	MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';	
var insertDocument = function(db, callback, data) {
   db.collection('weggismatt').insertOne( data , function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback(result);
  });
};
	
fs.readFile('./input-1.html', 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
	
	var jsonArr = tabletojson.convert(data);
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  insertDocument(db, function() {
		  db.close();
	  },jsonArr[1]
	  );
	});
});








