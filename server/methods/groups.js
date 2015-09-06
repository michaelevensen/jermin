Meteor.methods({
  createGroup: function(group) {
    check(group, {
      name: String,
      authorId: String,
      memberIds: [String]
    });

    // optional
    if(group.description) {
      check(group.description, String);
    }

    var groupId = Groups.insert(group, function(error, result) {
      if(error) {
        throw new Meteor.Error(error.sanitizedError.error, error.message);
      }

      return result;
    });
  },

  addPostToGroup: function(postId, groupId) {
    check(postId, String);
    check(groupId, String);

    // add post to group
    Groups.update(groupId, {$addToSet: {postIds: postId}});

    // add groupid to post
    Posts.update(postId, {$addToSet: {groupIds: groupId}});
  },

  removePostFromGroup: function(postId, groupId) {
    check(postId, String);
    check(groupId, String);

    // remove post from group
    Groups.update(groupId, {$pull: {postIds: postId}});
  },

  setGroupPrivate: function(groupId, state) {
    check(groupId, String);
    check(state, Boolean);

    var userId = Meteor.userId();

    // check permissions
    var group = Groups.findOne(groupId, {$in: {memberIds: [userId]}});

    // is group member
    if(group) {
      Groups.update(groupId, {$set: {
        'isPrivate': state
      }});
    } else {
      throw new Meteor.Error('no-permissions', "You don't have permission to do this.");
    }
  }
});
