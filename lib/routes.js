
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
FlowRouter.route('/@:username', {
  name: 'profile',
  subscriptions: function(params) {
    // not using Subs Manager here because I don't want it to be cached - NOTE: WHY?
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
  triggersEnter: [isAdmin]
});

// Invites
adminRoutes.route('/invites', {
  name: 'admin/invites',
  action: function() {
    BlazeLayout.render('layout', {main: 'invites'});
  }
});

// Invites
adminRoutes.route('/users', {
  name: 'admin/users',
  action: function() {
    BlazeLayout.render('layout', {main: 'users'});
  }
});


/*
* Groups
*/
var groupRoutes = FlowRouter.group({
  prefix: '/groups'
});

groupRoutes.route('/', {
  name: 'groupList',
  action: function() {
    BlazeLayout.render('layout', {main: 'groupList'});
  }
});

// Group Page
var groupPageRoutes = groupRoutes.group({
  prefix: '/:groupSlug'
});

groupPageRoutes.route('/', {
  name: 'groupPage',
  subscriptions: function(params) {
    // have to subscribe at route level to check if group exists before redirecting
    this.register('groupBySlug', subs.subscribe('groupBySlug', params.groupSlug));
  },
  triggersEnter: [function(context, redirect) {
    var slug = context.params.groupSlug;
    var group = Groups.findOne({slug: slug});

    if(!group) {
      redirect('/');
    }
  }],
  action: function() {
    BlazeLayout.render('layout', {main: 'groupPage'});
  }
});

groupPageRoutes.route('/manage', {
  name: 'groupManage',
  action: function() {
    BlazeLayout.render('layout', {main: 'manageGroup'});
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
* Triggers
*/
// check login
function isLoggedIn(context, redirect) {
  if(!Meteor.userId()) {
    redirect('/');
  }
}

// check admin
function isAdmin(context, redirect) {
  var userId = Meteor.userId();

  if(!Roles.userIsInRole(userId, ['admin'])) {
    redirect('/');
  }
}

function isModerator(context, redirect) {
  var userId = Meteor.userId();

  if(!Roles.userIsInRole(userId, ['moderator'])) {
    redirect('/');
  }
}

/*
* Not Found
*/
FlowRouter.notFound = {
  action: function() {
    FlowRouter.go('index');
  }
};
