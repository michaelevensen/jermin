Template.profile.onCreated(function() {
  var postAuthorUsername = FlowRouter.getParam('username');
  author = Meteor.users.findOne({username: postAuthorUsername});

  // subscribe
  subs.subscribe('postsByUsername', postAuthorUsername);
});

Template.profile.helpers({
  posts: function() {
    return Posts.find({authorId: author._id}, {sort: {createdAt: -1}});
  },

  username: function() {
    return author.username;
  }
});
