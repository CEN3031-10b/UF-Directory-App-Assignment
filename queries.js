/* Fill out these functions using Mongoose queries*/
var mongoose = require('mongoose'), 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

mongoose.connect(config.db.uri);

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   
	Listing.find({name:"Library West"}, function(err, listing){
		if(err) throw err;
		console.log(listing);
   });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   
   Listing.find({code:"CABL"}).remove().exec(function(err){
	   if(err) throw err;
   });
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
   
   Listing.where({name: "Phelps Memorial Hospital Center"}, {$set:{address:'new address'}});
};
var retrieveAllListings = function() {
	/* 
		Retrieve all listings in the database, and log them to the console. 
	*/

	 Listing.find({}, function(err, l) {
	  if (err) throw err;
	  console.log(l);
	})
	.exec(function(){
		mongoose.disconnect();
	});
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();

