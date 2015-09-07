
Template.profile.onCreated(function() {
  var username = FlowRouter.getParam('username');
  subs.subscribe('postsByUsername', username);
});

Template.profile.helpers({
  posts: function() {
    if(this._id==Meteor.userId()) {
      // your own posts
      return Posts.find({authorId: this._id, groupIds: {$exists: false}}, {sort: {createdAt: -1}});
    } else {
      // other posts
      return Posts.find({authorId: this._id, isPrivate: false, groupIds: {$exists: false}}, {sort: {createdAt: -1}});
    }

    // var postIds = this.postIds;
    // return Posts.find({$in: {postIds}});
  },

  user: function() {
    var username = FlowRouter.getParam('username');
    return Meteor.users.findOne({username: username});
  },

  allowedToPost: function() {
    return Meteor.userId() === this._id;
  }
});
