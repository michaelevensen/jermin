
// All posts by all users
Meteor.publish('allPosts', function() {
	return Posts.find();
});

// Posts by Username
Meteor.publish('postsByUsername', function(username) {
	check(username, String);
	var author = Meteor.users.findOne({username: username});

	if(author) {
		return Posts.find({authorId: author._id});
	} else {
		return false;
	}
});
