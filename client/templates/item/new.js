Template.new.events({
  'submit form': function(event, template){
    event.preventDefault();

    // new url
    var post = {
      url: $('input[name=new-post]').val()
    };

    // add
    Meteor.call('addPost', post, function(error, result) {
      if(error) {
        // Session.set('errorMessage', error.reason);
        alert(error.reason);
      }
    });

    // reset
    $('input[name=new-post]').val('');
  },
});

Template.onCreated(function() {
  Session.setDefault('errorMessage', '');
});

Template.new.onRendered(function() {
  Session.set('errorMessage', '');
});
