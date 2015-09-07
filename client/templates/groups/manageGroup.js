Template.manageGroup.onCreated(function() {
  Session.setDefault('errorMessage', '');

  var slug = FlowRouter.getParam('groupSlug');
  subs.subscribe('groupBySlug', slug);
  subs.subscribe('postsForGroup', slug);

});

Template.manageGroup.onRendered(function() {
  Session.set('errorMessage', '');
});

Template.manageGroup.events({
  'submit form': function(event, template){
    event.preventDefault();
  }
});

Template.manageGroup.helpers({

  group: function() {
    var groupSlug = FlowRouter.getParam('groupSlug');
    return Groups.findOne({slug: groupSlug});
  },

  members: function() {
    return Meteor.users.find({_id: {$in: this.memberIds}});
  },

  memberPostCount: function() {
    var memberPosts = Posts.find({authorId: this._id});
    if(memberPosts) {
      return memberPosts.count();
    } else {
      return 0;
    }
  },

  errorMessage: function(field) {
    var errorObject = Session.get('errorMessage');
    if( !_.isUndefined(errorObject) && !_.isUndefined(errorObject[field]) ) {
      return Session.get('errorMessage')[field];
    } else {
      return false;
    }
  },

  errorClass: function(field) {
    var errorObject = Session.get('errorMessage');
    if( !_.isUndefined(errorObject) && !_.isUndefined(errorObject[field]) ) {
      return 'has-error';
    } else {
      return '';
    }
  },
});
