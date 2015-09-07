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
        return alert(error.reason);
      }

      if(result) {
        // For groups
        if(_.isUndefined(template.data.username)) {
          var postId = result;
          var groupId = template.data._id;

          // add post to group
          Meteor.call('addPostToGroup', postId, groupId);
        }
      }
    });

    // reset input
    $('input[name=new-post]').val('');
  },
});
