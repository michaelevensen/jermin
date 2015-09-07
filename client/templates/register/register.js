Template.register.onCreated(function() {
  Session.setDefault('errorMessage', '');
});

Template.register.onRendered(function() {
  Session.set('errorMessage', '');
});

Template.register.events({
  'focusout input, keyup input': function (event, template) {
		event.preventDefault();

		// input name
		var name = $(event.target).attr('name');
		var errors = Session.get('errorMessage');

		Session.set('errorMessage', _.omit(errors, name));
	},

  'focusout input[name=username]': function(event, template) {
    var username = template.$('input[name=username]').val().toLowerCase();
		var usernameExists = Meteor.users.findOne({'username': {$regex: '^'+username+'$', $options: 'i'} });

		var errors = Session.get('errorMessage');

    // check if exists
    if(usernameExists) {
			errors.username = "This username already exists. Try another one.";
		}
    else if(username) {
      // check formatting
      var regex = /^[a-z0-9_-]{3,16}$/;
      if(!regex.test(username)) {
        errors.username = "Please specify a valid username. Has to be letters and / or numbers.";
      }
    }
    else {
			delete errors.username;
		}

		Session.set('errorMessage', errors);
  },

  'submit form': function(event, template){
     event.preventDefault();

     var user = {
       username: $('input[name=username]').val().toLowerCase(),
       password: $('input[name=password]').val(),
       token: $('input[name=token]').val()
     };

    /*
    * Validate
    */
    var errors = {};

    if(!user.username) {
      errors.username = "Please specify a valid username. Has to be letters and / or numbers.";
    }
    var usernameExists = Meteor.users.findOne({'username': {$regex: '^'+user.username+'$', $options: 'i'} });
    if(usernameExists) {
			errors.username = "This username already exists. Try another one.";
		}

    if(!user.password) {
      errors.password = "Please specify a password";
    }

    // validate token
    Meteor.call('validateToken', user.token, function(error, result) {
      if(error) {
        errors.token = error.message;
      }
    });

    Session.set('errorMessage', errors);

    // register
    if(_.isEmpty(errors)) {
      Accounts.createUser({username: user.username, password: user.password}, function(error) {
        if(error) {
          alert(error);
        }

        // use invite
        Meteor.call('useInvite', user.token);

        // close login
        Modal.closeAll();
      });
    }
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

  // user ?action=register&token=YOUR_TOKEN
  prefillToken: function() {
    if(this.token) {
      return this.token;
    }
  }
});
