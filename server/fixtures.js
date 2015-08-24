Meteor.startup(function() {

  if(Meteor.users.find().count() === 0) {
    // add myself as admin
    var user = Accounts.createUser({
  		username: "admin",
  		password: "1234"
  	});

    Roles.addUsersToRoles(user, ['admin']);
  }
});
