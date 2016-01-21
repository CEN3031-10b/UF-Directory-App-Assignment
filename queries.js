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
		console.log("-----------------findLibraryWest()-----------------");
		if(err){
			console.log(err);
			return;
		}
		
		console.log(listing);
	});
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   
   Listing.findOneAndRemove({code:"CABL"}, function(err, listing){
	   console.log("\n-----------------removeCable()-----------------");
		if(err){
			console.log(err);
			return;
		}
		if(!listing){
			console.log("No listing with code = 'CABL' found");
		}
		else{
			console.log(listing);
		}
	});
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
   Listing.findOneAndUpdate({code: "PHL"},
		{
			$set:{
				address:'102 Phelps Lab, Gainesville, FL 32611', 
				coordinates:{latitude:29.644718 , longitude:  -82.348871}
		}},
		{new:true}, // return the updated listing
		function(err, listing){
			console.log("\n-----------------updatePhelpsMemorial()-----------------");
			if (err) throw err;
			console.log(listing);
		}
	);
};
var retrieveAllListings = function() {
	/* 
		Retrieve all listings in the database, and log them to the console. 
	*/
	var counter = 0;
	Listing.find({}, function(err, l) {
		if (err) throw err;
		counter += 1;
		if(counter == 1){
			console.log("\n-----------------retrieveAllListings()-----------------");
		}
		console.log(l);
	}).exec(function(){
		// exit after all listings have been printed
		// this *should* take the longest time
		mongoose.disconnect();
	});
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();

