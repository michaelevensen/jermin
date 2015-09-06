
Template.groupPage.onCreated(function() {

  var slug = FlowRouter.getParam('groupSlug');

  this.subscribe('allUsernames');
  this.subscribe('postsForGroup', slug);
});

Template.groupPage.events({
  "click a[name=manage-group]": function(event, template){
    event.preventDefault();

    // open manage group
    FlowRouter.setQueryParams({action: 'manageGroup'});
  },

  "click .is-private": function(event, template){
    event.preventDefault();

    // group id
    var groupId = this._id;
    var state = this.isPrivate ? false : true;

    console.log(groupId);

    // set to private
    Meteor.call('setGroupPrivate', groupId, state, function(error, result) {
      if(error)
        alert(error);
    });
  }
});

Template.groupPage.helpers({
  posts: function() {
    var slug = FlowRouter.getParam('groupSlug');
    var group = Groups.findOne({slug: slug});
    if(group) {
      var postIds = group.postIds;
      var posts = Posts.find({_id: {$in: postIds}}, {sort: {createdAt: -1}});
      return posts.map(function(post) {
        return _.extend(post, {
          groupId: group._id
        });
      });
      // return Posts.find({_id: {$in: posts}}, {sort: {createdAt: -1}});
    }
  },

  group: function() {
    var slug = FlowRouter.getParam('groupSlug');

    return Groups.findOne({slug: slug});
  },

  members: function() {
    var slug = FlowRouter.getParam('groupSlug');
    var memberIds = Groups.findOne({slug: slug}).memberIds;

    return Meteor.users.find({_id: {$in: memberIds}});
  },

  isAuthor: function() {
    var slug = FlowRouter.getParam('groupSlug');
    var group = Groups.findOne({slug: slug});

    return group.authorId===Meteor.userId();
  },

  isMember: function() {
    var slug = FlowRouter.getParam('groupSlug');
    var memberIds = Groups.findOne({slug: slug}).memberIds;

    return memberIds.indexOf(Meteor.userId()) != -1 ? true : false;
  },

  private: function() {
    return this.isPrivate ? 'checked' : '';
  }
});
