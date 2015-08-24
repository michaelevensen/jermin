Template.users.helpers({
  users: function() {
    return Meteor.users.find({}, {sort: {createdAt: -1}});
  },
  posts: function(userId) {
    return Posts.find({authorId: userId}).count();
  }
});

Template.users.onCreated(function() {
  // subscribe
  subs.subscribe('allUsers');
});
