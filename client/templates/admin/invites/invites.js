
Template.invites.helpers({
  invites: function() {
    return Invites.find({}, {sort: {createdAt: -1}});
  },
});

Template.invites.onCreated(function() {
  // subscribe
  subs.subscribe('allInvites');
});


Template.invites.events({
  "submit form": function(event, template){
    event.preventDefault();

    var url = window.location.origin;
    var email = $('input[name=create-invite]').val().toLowerCase();

    // add invite
    Meteor.call('sendInvite', email, url, function(error, result) {
      if(error) {
        return alert(error);
      }
      // success
      $('input[name=create-invite]').val('');
    });
  }
});
