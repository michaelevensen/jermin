Template.groupList.onCreated(function() {

  subs.subscribe('publicGroups');

  // only subscribe to user groups if logged in
  if(Meteor.userId()) {
    subs.subscribe('personalGroups');
  }
});

Template.groupList.events({
  'click a[name=new-group]': function(event, template){
    event.preventDefault();

    // open new group
    FlowRouter.setQueryParams({action: 'newGroup'});
  }
});

Template.groupList.helpers({
  personalGroups: function(){
    var userId = Meteor.userId();
    var userGroups = Roles.getGroupsForUser(userId, 'member');

    return Groups.find({_id: {$in: userGroups}}, {sort: {createdAt: -1}});
  },

  publicGroups: function(){
    var userId = Meteor.userId();
    var userGroups = Roles.getGroupsForUser(userId, 'member');

    return Groups.find({_id: {$nin: userGroups}}, {isPrivate: false}, {sort: {createdAt: -1}});
  },

  memberCount: function() {
    var groupId = this._id;
    return Roles.getUsersInRole('member', groupId).count();
  },

  postCount: function() {
    if(this.postIds) {
      return this.postIds.length;
    } else {
      return 0;
    }
  },

  author: function() {
    var authorId = this.authorId;
    return Meteor.users.findOne(authorId);
  }
});
