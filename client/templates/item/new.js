Template.onCreated(function() {
  Session.setDefault('errorMessage', '');
});

Template.new.onRendered(function() {
  Session.set('errorMessage', '');
});

Template.new.events({
  'submit form': function(event, template){
    event.preventDefault();

    // new url
    var post = {
      url: $('input[name=new-post]').val()
    };

    console.log(post);

    // add
    Meteor.call('addPost', post, function(error, result) {
      if(error) {
        return alert(error.reason);
      }

      if(result) {
        /*
        * For groups
        */
        var groupId = template.data.groupId;

        if(groupId) {
          var postId = result;

          // add post to group
          Meteor.call('addPostToGroup', postId, groupId);
        }
      }
    });

    // reset
    $('input[name=new-post]').val('');
  },
});
