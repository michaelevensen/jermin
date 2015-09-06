Template.newGroup.events({
  'submit form': function(event, template) {
    event.preventDefault();

    //
    var authorId = Meteor.userId();

    var group = {
      name: $('input[name=name]').val(),
      description: $('input[name=description]').val(),
      authorId: authorId,
      memberIds: [authorId],
    };



    /*
    * Validate
    */
    var errors = {};

    if(!group.name) {
     errors.name = "You have to name your group something.";
    }

    Session.set('errorMessage', errors);

    // add new
    if(_.isEmpty(errors)) {
      Meteor.call('createGroup', group, function(error, result) {
         if(error) {
           return alert(error);
         }

         // success
         Modal.closeAll();
      });
    }
  }
});

Template.newGroup.helpers({
  errorMessage: function(field) {
    var errorObject = Session.get('errorMessage');
    if(!_.isUndefined(errorObject) && !_.isUndefined(errorObject[field])) {
      return Session.get('errorMessage')[field];
    } else {
      return false;
    }
	},

	errorClass: function(field) {
    var errorObject = Session.get('errorMessage');
    if(!_.isUndefined(errorObject) && !_.isUndefined(errorObject[field])) {
      return 'has-error';
    } else {
      return '';
    }
  },
});

Template.newGroup.onCreated(function() {
  Session.setDefault('errorMessage', '');
});

Template.newGroup.onRendered(function() {
  Session.set('errorMessage', '');
});
