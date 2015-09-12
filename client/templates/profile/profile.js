
Template.profile.onCreated(function() {
  var username = FlowRouter.getParam('username');
  subs.subscribe('user', username);
});

Template.profile.helpers({
  posts: function() {

    // Logged in - viewing your own profile (private posts)
    if(this._id==Meteor.userId()) {
      return Posts.find({authorId: this._id, groupIds: {$exists: false}}, {sort: {createdAt: -1}});
    }

    // When viewing other profiles
    else {
      return Posts.find({authorId: this._id, isPrivate: false, groupIds: {$exists: false}}, {sort: {createdAt: -1}});
    }
  },

  user: function() {
    var username = FlowRouter.getParam('username');
    return Meteor.users.findOne({username: username});
  },

  allowedToPost: function() {
    return Meteor.userId() === this._id;
  }
});
