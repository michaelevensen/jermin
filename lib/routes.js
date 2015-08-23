
// Global Subs
// FlowRouter.subscriptions = function() {
// };

/*
* Index
*/
FlowRouter.route('/', {
  name: 'index',
  action: function() {
    BlazeLayout.render('layout', {main: 'index'});
  }
});

/*
* Profile (User)
*/
FlowRouter.route('/:username', {
  name: 'profile',
  subscriptions: function(params) {
    this.register('singleUser', Meteor.subscribe('singleUser', params.username));
  },
  triggersEnter: [function(context, redirect) {
    var name = context.params.username;
    var userExists = Meteor.users.findOne({username: name});

    if(!userExists) {
      redirect('/');
    }
  }],
  action: function() {
    BlazeLayout.render('layout', {main: 'profile'});
  }
});

/*
* Not Found
*/
FlowRouter.notFound = {
  action: function() {
    FlowRouter.go('index');
  }
};
