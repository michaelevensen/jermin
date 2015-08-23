Template.index.onCreated(function() {
  subs.subscribe('allPosts');
});

Template.index.helpers({
  posts: function() {
    return Posts.find({}, {sort: {createdAt: -1}});
  }
});
