Template.users.onCreated(function() {
  subs.subscribe('allUsers');
});

Template.users.helpers({
  users: function() {
    return Meteor.users.find({}, {sort: {createdAt: -1}});
  },
  posts: function(userId) {
    return Posts.find({authorId: userId}).count();
  }
});
