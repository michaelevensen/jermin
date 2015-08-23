Template.register.events({
  'submit form': function(event, template){
     event.preventDefault();

     var user = {
       username: $('input[name=username]').val().toLowerCase(),
       password: $('input[name=password]').val()
     };

    // register
    Accounts.createUser(user, function(error, result) {
      if(error) {
        return Session.set('errorMessage', error.reason);
      }

      // close login
      Modal.closeAll();
    });
  }
});

Template.register.helpers({
  errorMessage: function(field) {
    var errorObject = Session.get('errorMessage');
    if( !_.isUndefined(errorObject) && !_.isUndefined(errorObject[field]) ) {
      return Session.get('errorMessage')[field];
    } else {
      return false;
    }
	},

	errorClass: function(field) {
    var errorObject = Session.get('errorMessage');
    if( !_.isUndefined(errorObject) && !_.isUndefined(errorObject[field]) ) {
      return 'has-error';
    } else {
      return '';
    }
  },
});

Template.register.onCreated(function() {
  Session.setDefault('errorMessage', '');
});

Template.register.onRendered(function() {
  Session.set('errorMessage', '');
});
