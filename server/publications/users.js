Meteor.publish('allUsernames', function() {
	return Meteor.users.find({}, {fields: {
		'username': 1
	}});
});
