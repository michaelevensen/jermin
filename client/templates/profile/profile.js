
Template.profile.onCreated(function() {

  /*
  * Reactive re-subscription to subscribe to extra posts for users
  */
  var instance =  Template.instance();
  instance.autorun(function() {
    if(FlowRouter.getParam('username')) {

      var postAuthorUsername = FlowRouter.getParam('username');

      // subscribe
      subs.subscribe('postsByUsername', postAuthorUsername);
    }
  });
});

Template.profile.helpers({
  posts: function() {
    var author = Meteor.users.findOne({username: FlowRouter.getParam('username')});
    var authorId = author._id;
    var posts = Posts.find({authorId: authorId, groupIds: {$exists: false}}, {sort: {createdAt: -1}});

    return posts;

    // var postIds = posts.map(function(post) {
    //   return post._id;
    // });

  },

  username: function() {
    return FlowRouter.getParam('username');
  }
});
