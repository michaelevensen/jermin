Template.index.onCreated(function() {
  Session.setDefault('errorMessage', '');

  // Template Level Subs
  subs.subscribe('allPosts');
});

Template.index.onRendered(function() {
  Session.set('errorMessage', '');
});

Template.index.events({
  'submit form': function(event, template){
    event.preventDefault();

    // new url
    var post = {
      url: $('input[name=new-post]').val()
    };

    // add
    Meteor.call('addPost', post, function(error, result) {
      if(error) {
        Session.set('errorMessage', error.reason);
      }
    });
  },

  'keyup input[name=new-post]': function(event) {

    // clear error message on backspace
    if(!_.isUndefined(Session.get('errorMessage'))) {
      if(event.keyCode == 8) {
        Session.set('errorMessage', '');
      }
    }
  },

  'focusout input[name=new-post]': function(event) {

    // clear error message
    if(!_.isUndefined(Session.get('errorMessage'))) {
      Session.set('errorMessage', '');
    }
  }
});

Template.index.helpers({
  posts: function() {
    return Posts.find({}, {sort: {createdAt: -1}});
  },

  errorMessage: function() {
    return Session.get('errorMessage');
	},

	errorClass: function() {
    return Session.get('errorMessage') ? 'has-error' : '';
  },
});
