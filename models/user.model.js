var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//User Schema
var UserSchema = mongoose.Schema ({
	username : {
		type: String, 
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	localdate : {
		type : [[{type : Date}]]
		
	},
	google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        googledate		 :  [{type : Date}]
    }
});

var User = module.exports = mongoose.model('User', UserSchema, 'users');  //users = collection name


//hash the password
module.exports.createUser = function(newUser, callback) {
	//from npm bycryptjs website
	bcrypt.genSalt(10, function(err, salt) {
		if (err) throw err;
    bcrypt.hash(newUser.password, salt, function(err, hash) {
    	if (err) throw err;
        // Store hash in your password DB. 
        newUser.password = hash;
        newUser.save(callback);
        console.log(newUser.username);
    });
});
}

module.exports.UpdateUsers = function(username, password, callback){
	var query = {username : username};
	User.findOne(query, function(password){
			bcrypt.genSalt(10, function(err, salt) {
		//if (err) throw err;
    bcrypt.hash(password, salt, function(err, hash) {
    	//if (err) throw err;
        // Store hash in your password DB. 
        password = hash;
       // newUser.save(callback);
        //console.log(newUser.username);
    });
	});

});
	//var newValues = {password : password};
	//User.updateOne(query,newValues,function(err,res){
	//	if(err) throw err;
	//})
	//User.update(query, {password :password},callback);
}

module.exports.getUserByUsername = function(username, callback) {
	var query = {username : username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    // res === true 
    if(err) throw err;
    callback(null, isMatch);
});
}