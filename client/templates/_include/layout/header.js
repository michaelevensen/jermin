Template.header.events({
  'click a[name=login]': function(event, template) {
    event.preventDefault();

    // open login
    FlowRouter.setQueryParams({action: 'login'});
  },
  'click a[name=logout]': function(event, template) {
    event.preventDefault();

    // logout
    Meteor.logout();

    // redirect
    FlowRouter.go('index');
  },
  'click a[name=register]': function(event, template) {
    event.preventDefault();

    // open register
    FlowRouter.setQueryParams({action: 'register'});
  },

});

Template.header.helpers({
  isAdmin: function(){
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  }
});
