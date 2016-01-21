'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);

// remove everything currently in the database
Listing.find({}).remove(function(err, removed){
	
	console.log(removed.result.n + " listing entries removed from mongolab.");
	
	// read listings.json
	var listings = JSON.parse(fs.readFileSync('listings.json', 'utf8')).entries;

	// go through listings.json and add entries to the db
	// use callback counter disconnect from the db when complete
	var entries_counter = 0;
	var callback = function(err){
		if(err){
			throw err;
		}
		entries_counter++;
		if(entries_counter == (listings.length)){
			console.log(listings.length + " listing entries added to mongolab.")
			mongoose.disconnect();
		}
	}

	// add listings to db
	for(var i = 0; i < listings.length; ++i){
		new Listing(listings[i])
		.save(callback);
	}	
});





