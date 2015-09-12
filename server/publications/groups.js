/*
*	Group List: My own groups
*/
Meteor.publish('personalGroups', function() {
  var userId = this.userId;
	var userGroups = Roles.getGroupsForUser(userId, 'member');

  // return groups associated with user
  return Groups.find({_id: {$in: userGroups}});
});


/*
*	Group List: Public groups
*/
Meteor.publishComposite('publicGroups', {
	find: function() {
		return Groups.find({isPrivate: false}, {sort: {createdAt: -1}});
	},
	children: [
		{
			find: function(group) {
				return Meteor.users.find(
					{_id: group.authorId},
					{limit: 1, fields: { 'username': 1 } });
			}
		}
	]
});


/*
*	Group Page
*/
Meteor.publishComposite('group', function(slug) {
	check(slug, String);

	return {
    find: function() {
			return Groups.find({slug: slug}, {limit: 1, sort: {createdAt: -1}});
    },
    children: [
      	{
            find: function(group) {
              if(group.postIds) {
                // group posts
              	return Posts.find({_id: {$in: group.postIds}}, {sort: {createdAt: -1}});
							}
            }
        },
        {
          find: function(group) {
            // group members
            return Roles.getUsersInRole('member', group._id);

						// return Meteor.users.find(
						// 			{_id: group.authorId},
						// 			{limit: 1, fields: { 'username': 1 } });
        	}
      	}
  		]
		};
});
