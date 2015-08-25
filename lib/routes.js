
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

// Register
var registerRoutes = FlowRouter.group({
  prefix: '/register'
});

registerRoutes.route('/', {
  name: 'register',
  action: function() {
    // show modal
    Modal.open('register');
  }
});

// Register with token
registerRoutes.route('/:token', {
  name: 'register',
  action: function(params) {
    // show modal
    Modal.open('register', {data: {token: params.token}});
  }
});

/*
* Profile (User)
*/
FlowRouter.route('/user/:username', {
  name: 'profile',
  subscriptions: function(params) {
    // not using Subs Manager here because I don't want it to be cached
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
* Admin
*/
var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  triggersEnter: [function(context, redirect) {
    // roles permission check
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      redirect('/');
    }
  }]
});


// Invites
adminRoutes.route('/invites', {
  name: 'admin/invites',
  action: function() {
    BlazeLayout.render('layout', {main: 'invites'});
  }
});


/*
* Shows all posts
* - Most useful for admins, but open to everyone.
*/
FlowRouter.route('/all', {
  name: 'all',
  action: function() {
    BlazeLayout.render('layout', {main: 'all'});
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
