Template.profile.helpers({
  posts: function() {
    var username = FlowRouter.getParam('username');
    var author = Meteor.users.findOne({username: username});
    return Posts.find({authorId: author._id}, {sort: {createdAt: -1}});
  },

  username: function() {
    var username = FlowRouter.getParam('username');
    var author = Meteor.users.findOne({username: username});
    return author.username;
  }
});

Template.profile.onCreated(function() {

  // Template Level Subs
  var postAuthor = FlowRouter.getParam('username');

  // subscribe
  subs.subscribe('postsByUsername', postAuthor);
});
