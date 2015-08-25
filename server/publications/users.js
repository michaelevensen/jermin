
// Find one user by username
Meteor.publish('singleUser', function(username) {
	check(username, String);
	return Meteor.users.find({username: username}, {
		fields: {
		'username': 1
	}});
});

// Admin
Meteor.publish('allUsers', function() {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
   return Meteor.users.find({}, {
		 fields: {
		 'username': 1,
	 }});
 } else {
   this.stop();
   return;
 }
});

// All Usernames
Meteor.publish('allUsernames', function() {
 return Meteor.users.find({}, {
	 fields: {
	 'username': 1,
 }});
});
