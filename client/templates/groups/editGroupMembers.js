Template.editGroupMembers.onCreated(function() {
  Session.setDefault('errorMessage', '');
  Session.setDefault('selectedUsername', '');

  var slug = FlowRouter.getParam('groupSlug');
  subs.subscribe('groupBySlug', slug);
  subs.subscribe('postsForGroup', slug);
});

Template.editGroupMembers.onRendered(function() {
  Session.set('errorMessage', '');
});

Template.editGroupMembers.events({
  'submit form': function(event, template){
    event.preventDefault();

    // get selected username
    var userId = Session.get('selectedUsername');

    // add user as member
    if(!_.isUndefined(userId)) {
      Meteor.call('addMemberToGroup', userId, this._id, function(error, result) {
        if(error) {
          return alert(error);
        }
      });
    }
  },

  'click a[name=remove-member]': function(event, template) {
    event.preventDefault();

    // NOTE: Dirty way of getting id's. should get parent data context
    // user id
    var userId = $(event.target).data('id');

    // shouldnt be able to remove author
    // if(userId!=this.)s

    // group id
    var groupId = $(event.target).data('group-id');

    // remove user as member
    if(confirm('You sure?')) {
      Meteor.call('removeMemberFromGroup', userId, groupId, function(error, result) {
        if(error) {
          return alert(error);
        }
      });
    }
  },

  'autocompleteselect input': function(event, template, doc) {
    Session.set('selectedUsername', doc._id);
  }
});

Template.editGroupMembers.helpers({

  group: function() {
    var groupSlug = FlowRouter.getParam('groupSlug');
    return Groups.findOne({slug: groupSlug});
  },

  members: function() {
    var groupId = this._id;
    var members = Roles.getUsersInRole('member', groupId);

    return members;
  },

  memberPostCount: function() {
    var groupId = Template.parentData()._id;

    var memberPosts = Posts.find({authorId: this._id, groupIds: {$in: [groupId]}});
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

  settings: function() {
    return {
      position: 'bottom',
      limit: 5,
      rules: [
        {
          token: '',
          collection: Meteor.users,
          field: 'username',
          template: Template.userPill
        }
      ]
    };
  }
});
