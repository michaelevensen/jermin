Template.index.onCreated(function() {
  subs.subscribe('allPosts');
});

Template.index.helpers({
  posts: function() {
    return Posts.find({isFeatured: true}, {sort: {createdAt: -1}});
  }
});
