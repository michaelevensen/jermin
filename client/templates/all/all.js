Template.all.onCreated(function() {
  subs.subscribe('allPosts');
});

Template.all.helpers({
  posts: function() {
    return Posts.find({}, {sort: {createdAt: -1}});
  }
});
