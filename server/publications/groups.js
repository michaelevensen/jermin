
// All public groups
Meteor.publish('allPublicGroups', function() {
	return Groups.find({isPrivate: false}, {sort: {createdAt: -1}});
});

// Private Groups for user
Meteor.publish('groupsForUser', function() {
  var userId = this.userId;

  // return groups associated with user
  return Groups.find({memberIds: {$in: [userId]}});
});

// group by slug
Meteor.publish('groupBySlug', function(slug) {
	check(slug, String);
	return Groups.find({slug: slug});
});
