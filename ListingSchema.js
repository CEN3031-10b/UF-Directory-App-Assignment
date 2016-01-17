/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
	code: {
        type:String,
        required: true,
        unique: true
    },
	name: {
        type:String,
        required: true,
    },
	coordinates: {
		lat: Number,
		lng: Number
	},
	address: String,
	updated_at: Date,
	created_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {
	
	if(!this.code && !this.name){
		var err = new Error('Listing save failed: Missing required field(s)[code,name]');
		next(err);
	}
	
	if(!this.created_at){
		this.created_at = Date.now;
	}
	
	this.updated_at = Date.now;
	
	next();
});


/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
