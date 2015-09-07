
Template.groupPage.onCreated(function() {
  var slug = FlowRouter.getParam('groupSlug');

  subs.subscribe('allUsernames');
  subs.subscribe('postsForGroup', slug);
});

Template.groupPage.events({
  // 'click a[name=manage-group]': function(event, template){
  //   event.preventDefault();
  //
  //   // open manage group
  //   // FlowRouter.setQueryParams({action: 'manageGroup'});
  //
  // },

  'click .private-group': function(event, template){
    event.preventDefault();

    // group id
    var groupId = this._id;
    var state = this.isPrivate ? false : true;

    // set to private
    Meteor.call('setGroupPrivate', groupId, state, function(error, result) {
      if(error) {
        return alert(error);
      }
    });
  }
});

Template.groupPage.helpers({
  group: function() {
    var slug = FlowRouter.getParam('groupSlug');
    return Groups.findOne({slug: slug});
  },

  posts: function() {
    if(this.postIds) {
      return Posts.find({_id: {$in: this.postIds}}, {sort: {createdAt: -1}});
    } else {
      return false;
    }
  },

  members: function() {
    return Meteor.users.find({_id: {$in: this.memberIds}});
  },

  isAuthor: function() {
    return this.authorId===Meteor.userId();
  },

  isMember: function() {
    return this.memberIds.indexOf(Meteor.userId()) != -1 ? true : false;
  },

  private: function() {
    return this.isPrivate ? 'checked' : '';
  }
});
