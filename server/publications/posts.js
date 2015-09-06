
// All featured posts
Meteor.publish('allFeaturedPosts', function() {
	return Posts.find({isFeatured: true}, {sort: {createdAt: -1}});
});

// All posts by all users
Meteor.publish('allPosts', function() {
	return Posts.find({}, {sort: {createdAt: -1}});
});

// Posts by Username
Meteor.publish('postsByUsername', function(username) {
	check(username, String);
	var author = Meteor.users.findOne({username: username});

	if(author) {
		return Posts.find({authorId: author._id});
	} else {
		this.stop();
    return;
	}
});

// Posts for group
Meteor.publish('postsForGroup', function(groupSlug) {
	check(groupSlug, String);
	// var postIds = Groups.findOne({slug: groupSlug}).postIds;
	// return Posts.find({_id: {$in: postIds}}, {sort: {createdAt: -1}});
	return Posts.find({}, {sort: {createdAt: -1}});
});
