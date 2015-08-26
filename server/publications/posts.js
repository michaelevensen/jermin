
// All posts by all users
Meteor.publish('allFeaturedPosts', function() {
	return Posts.find({isFeatured: true}, {sort: {createdAt: -1}});
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
