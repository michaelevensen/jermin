Template.header.events({
  'click a[name=login]': function(event, template) {
    event.preventDefault();

    // login
    Modal.open('login');
    // FlowRouter.go('login');
  },
  'click a[name=logout]': function(event, template) {
    event.preventDefault();

    // logout
    Meteor.logout();
  },
  'click a[name=register]': function(event, template) {
    event.preventDefault();

    // login
    FlowRouter.go('register');
  },

});

Template.header.helpers({
  isAdmin: function(){
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  }
});
