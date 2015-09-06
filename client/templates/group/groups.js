Template.groups.onCreated(function() {
  subs.subscribe('allPublicGroups');
  subs.subscribe('allUsernames');

  // only subscribe to user groups if logged in
  if(Meteor.userId()) {
    subs.subscribe('groupsForUser');
  }
});

Template.groups.helpers({
  mine: function(){
    var userId = Meteor.userId();
    return Groups.find({memberIds: {$in: [userId]}}, {sort: {createdAt: -1}});
  },

  groups: function(){
    var userId = Meteor.userId();
    return Groups.find({memberIds: {$nin: [userId]}}, {sort: {createdAt: -1}});
  },

  memberCount: function() {
    return this.memberIds.length;
  },

  postCount: function() {
    return this.postIds.length;
  },

  groupAuthor: function() {
    return Meteor.users.findOne(this.authorId);
  }
});

Template.groups.events({
  'click a[name=new-group]': function(event, template){
    event.preventDefault();

    // open new group
    FlowRouter.setQueryParams({action: 'newGroup'});
  }
});
