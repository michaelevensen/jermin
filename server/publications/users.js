/*
*	Profile Page
*/
Meteor.publishComposite('user', function(username) {
	check(username, String);

	return {
		find: function() {
			return Meteor.users.find(
				{username: username},
				{limit: 1, fields: { 'username': 1 } });
		},
		children: [
			{
				find: function(user) {

					// Logged in - viewing your own profile (private posts)
					if(this.userId) {
					  return Posts.find({authorId: user._id, groupIds: {$exists: false}}, {sort: {createdAt: -1}});
					}

					// When viewing other profiles
					else {
					  return Posts.find({authorId: user._id, isPrivate: false, groupIds: {$exists: false}}, {sort: {createdAt: -1}});
					}
				}
			}
		]
	};
});


// All usernames (for adding members to groups)
Meteor.publish('allUsernames', function() {
	if(this.userId) {
		return Meteor.users.find({}, {
			fields: {
				'username': 1
			}
		});
	}
});

/*
*	For Admin Only
*/
Meteor.publish('allUsers', function() {
  if(Roles.userIsInRole(this.userId, ['admin'])) {
  	return Meteor.users.find({}, {
			fields: {
				'username': 1,
				'createdAt': 1
			}
	 	});
	 }
	 else {
		 this.stop();
	   return;
	 }
});
