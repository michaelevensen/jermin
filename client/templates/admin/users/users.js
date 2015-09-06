Template.users.onCreated(function() {
  subs.subscribe('allUsers');
  subs.subscribe('allPosts');
});

Template.users.helpers({
  users: function() {
    return Meteor.users.find({}, {sort: {createdAt: -1}});
  },
  posts: function(userId) {
    var postCount = Posts.find({authorId: userId}).count();
    return postCount ? postCount : 'None';
  }
});
