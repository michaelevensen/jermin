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

    var currentUserId = Meteor.userId();

    // Check if user is member of group
    if(Roles.userIsInRole(currentUserId, ['member'], groupId)) {

      // add post to group
      Groups.update(groupId, {$addToSet: {postIds: postId}});

      // add groupid to post
      Posts.update(postId, {$addToSet: {groupIds: groupId}});
    }
    else {
      throw Meteor.Error("no-permissions", "You don't have permissions to add posts to this group.");
    }
  },

  addMemberToGroup: function(userId, groupId) {
    check(userId, String);
    check(groupId, String);

    var currentUserId = Meteor.userId();

    // Check if user is member of group
    if(Roles.userIsInRole(currentUserId, ['member'], groupId)) {

      // Add user to group
      Roles.addUsersToRoles(userId, ['member'], groupId);
    }
    else {
      throw Meteor.Error("no-permissions", "You don't have permissions to add members to this group.");
    }
  },

  removeMemberFromGroup: function(userId, groupId) {
    check(userId, String);
    check(groupId, String);

    var currentUserId = Meteor.userId();

    // Removing author is not possible
    var group = Groups.findOne(groupId);
    if(group && userId==group.authorId) {
      throw new Meteor.Error("You cannot remove the author of this group. Try deleting the group instead.");
    }

    // Check if user is member of group
    if(Roles.userIsInRole(currentUserId, ['member'], groupId)) {

      // Remove member from group
      return Groups.update(groupId, {$pull: {memberIds: userId}}, function(error, result) {
        if(error) {
          throw new Meteor.Error(error.sanitizedError.error, error.message);
        }
      });
    }
    else {
      throw Meteor.Error("no-permissions", "You don't have permissions to remove members from this group.");
    }
  },

  removePostFromGroup: function(postId, groupId) {
    check(postId, String);
    check(groupId, String);

    var currentUserId = Meteor.userId();

    // Check permissions
    if(Roles.userIsInRole(currentUserId, ['member'], groupId)) {

      // Remove post from group
      return Groups.update(groupId, {$pull: {postIds: postId}});
    }
    else {
      throw Meteor.Error("no-permissions", "You don't have permissions to remove posts from this group.");
    }
  },

  deleteGroup: function(groupId) {
    check(groupId, String);

    var currentUserId = Meteor.userId();

    // current group
    var group = Groups.findOne(groupId);

    // Only Authors are allow to do this
    if(group.authorId===currentUserId) {
      Groups.remove(groupId);
    } else {
      throw new Meteor.Error("no-permissions", "Only the author of the group is allowed to delete groups.");
    }
  },

  setGroupPrivate: function(groupId, state) {
    check(groupId, String);
    check(state, Boolean);

    var currentUserId = Meteor.userId();

    // Check if user is member of group
    if(Roles.userIsInRole(currentUserId, ['member'], groupId)) {

      // Set to private
      Groups.update(groupId, {$set: {
        'isPrivate': state
      }});
    }
    else {
      throw Meteor.Error("no-permissions", "You don't have permissions to remove posts from this group.");
    }
  }
});
