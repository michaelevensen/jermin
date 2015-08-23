Meteor.methods({
  doesUsernameExist: function(username){
    check(username, String);

    var userExists = Meteor.users.findOne({username: username});
    if(userExists) {
      return true;
    } else {
      return false;
    }
  }
});
