var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/salesforce', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
})

router.get('/getAll', function(req, res, next) {

    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/SugarRipper';

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Connection Successful');
            var db = client.db('item');
            var collection = db.collection('item');

            collection.find({}).toArray((err, result) =>{
            	if (err) {
            		console.log(err)
            	} else if (result.length){
            		res.render('itemList', {
            			'itemList' : result
            		});
            	} else {
            		res.send('No items found');
            		console.log(result)
            	}
            })


            client.close();
        }
    })
});

module.exports = router;