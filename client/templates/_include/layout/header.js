Template.header.events({
  'click a[name=login]': function(event, template) {
    event.preventDefault();

    // login
    Modal.open('login');
  },
  'click a[name=logout]': function(event, template) {
    event.preventDefault();

    // logout
    Meteor.logout();
  },
  'click a[name=register]': function(event, template) {
    event.preventDefault();

    // login
    Modal.open('register');
  },

});
