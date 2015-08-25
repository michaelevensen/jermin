Meteor.startup(function() {

  if(Meteor.users.find().count() === 0) {
    // add myself as admin
    var user = Accounts.createUser({
  		username: "admin",
  		password: "1234"
  	});

    Roles.addUsersToRoles(user, ['admin']);
  }


  // Mailgun
  process.env.MAIL_URL = 'smtp://postmaster@sandbox0698895c0b894ea799dc2b591c06b29f.mailgun.org:71a2595828b540cd674e70daf4fd7e5e@smtp.mailgun.org:587';
});
