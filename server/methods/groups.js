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


  /*
  * Reserved for group members
  */
  addPostToGroup: function(postId, groupId) {
    check(postId, String);
    check(groupId, String);

    // NOTE: should check if you're a member of the group!

    // add post to group
    Groups.update(groupId, {$addToSet: {postIds: postId}});

    // add groupid to post
    Posts.update(postId, {$addToSet: {groupIds: groupId}});
  },

  addMemberToGroup: function(userId, groupId) {
    check(userId, String);
    check(groupId, String);

    // NOTE: should check if you're a member of the group!

    // add member to group
    Groups.update(groupId, {$addToSet: {memberIds: userId}}, function(error, result) {
      if(error) {
        throw new Meteor.Error(error.sanitizedError.error, error.message);
      }
      return result;
    });
  },

  removePostFromGroup: function(postId, groupId) {
    check(postId, String);
    check(groupId, String);

    // NOTE: should check if you're a member of the group!

    // remove post from group
    Groups.update(groupId, {$pull: {postIds: postId}});
  },

  deleteGroup: function(groupId) {
    check(groupId, String);

    var userId = Meteor.userId();

    // NOTE: Only Authors are allow to do this!
    var group = Groups.findOne(groupId);

    // check if author
    if(group.authorId===userId) {
      Groups.remove(groupId);
    } else {
      throw new Meteor.Error('no-permissions', "Only the author of the group is allowed to delete groups.");
    }
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
