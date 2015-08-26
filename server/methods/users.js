Meteor.methods({
  usernameExists: function(username) {
    check(username, String);

    // check if user with username exists
    var user = Meteor.users.findOne({username: {$regex: '^'+username+'$', $options: 'i'} });
    return user ? true : false;
  },
});
