Template.posts.helpers({
  posts: function() {
    return Posts.find({}, {sort: {createdAt: -1}});
  },
  isFeatured: function() {
    return this.isFeatured ? 'checked' : '';
  }
});

Template.posts.onCreated(function() {
  // subscribe
  subs.subscribe('allPosts');
});
