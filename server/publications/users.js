// Meteor.publish('allUsernames', function() {
// 	return Meteor.users.find({}, {fields: {
// 		'username': 1
// 	}});
// });

// Find one user by username
Meteor.publish('singleUser', function(username) {
	check(username, String);
	return Meteor.users.find({username: username}, {fields: {
		'username': 1
	}});
});
