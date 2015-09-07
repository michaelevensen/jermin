Template.groupList.onCreated(function() {

  subs.subscribe('allPublicGroups');
  subs.subscribe('allUsernames');

  // only subscribe to user groups if logged in
  if(Meteor.userId()) {
    subs.subscribe('groupsForUser');
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
    return Groups.find({memberIds: {$in: [userId]}}, {sort: {createdAt: -1}});
  },

  publicGroups: function(){
    var userId = Meteor.userId();
    return Groups.find({memberIds: {$nin: [userId]}, isPrivate: false}, {sort: {createdAt: -1}});
  },

  memberCount: function() {
    return this.memberIds.length;
  },

  postCount: function() {
    if(this.postIds) {
      return this.postIds.length;
    } else {
      return 0;
    }
  },

  author: function() {
    return Meteor.users.findOne(this.authorId);
  }
});
