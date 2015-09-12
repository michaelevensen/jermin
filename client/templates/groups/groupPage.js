
Template.groupPage.onCreated(function() {
  var slug = FlowRouter.getParam('groupSlug');
  subs.subscribe('group', slug);
});

Template.groupPage.events({
  'click a[name=edit-group-members]': function(event, template){
    event.preventDefault();

    // open manage group
    Modal.open('editGroupMembers', {data: this.data});
  },

  'click a[name=delete-group]': function(event, template){
    event.preventDefault();

    if(confirm('You sure?')) {
      Meteor.call('deleteGroup', this._id, function(error, result) {
        if(error) {
          return alert(error);
        }

        // back to list
        FlowRouter.go('groupList');
      });
    }
  },

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
    var groupSlug = FlowRouter.getParam('groupSlug');
    return Groups.findOne({slug: groupSlug});
  },

  posts: function() {
    if(this.postIds) {
      return Posts.find({_id: {$in: this.postIds}}, {sort: {createdAt: -1}});
    } else {
      return false;
    }
  },

  members: function() {
    var groupId = this._id;
    return Roles.getUsersInRole('member', groupId);
  },

  isAuthor: function() {
    var authorId = this.authorId;
    return authorId===Meteor.userId();
  },

  isMember: function() {
    var groupId = this._id;
    var userId = Meteor.userId();
    return Roles.userIsInRole(userId, 'member', groupId);
  },

  private: function() {
    return this.isPrivate ? 'checked' : '';
  }
});
