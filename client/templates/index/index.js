Template.index.onCreated(function() {
  subs.subscribe('allFeaturedPosts');
  subs.subscribe('allUsernames');
});

Template.index.helpers({
  posts: function() {
    return Posts.find({isFeatured: true}, {sort: {createdAt: -1}});
  },

  authorName: function(userId) {
    var user = Meteor.users.findOne(userId, {fields: {
      'username': 1
    }});
    return user.username;
  },

  featuredUsernames: function() {
    var posts = Posts.find({isFeatured: true}, {sort: {createdAt: -1}});

    if(posts) {
      var authorIds = posts.map(function(post) {
        return post.authorId;
      });

      // make sure they're unique
      var uniqueAuthorIds = _.uniq(authorIds, true);

      // return users
      var users = Meteor.users.find({_id: {$in: uniqueAuthorIds}});
      return users.map(function(user) {
        return user.username;
      });
    }
  }
});
