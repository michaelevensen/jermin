Template.all.onCreated(function() {
  subs.subscribe('allPosts');
  subs.subscribe('allUsernames');
});

Template.all.helpers({
  posts: function() {
    return Posts.find({}, {sort: {createdAt: -1}});
  }
});
