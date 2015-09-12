Template.new.events({
  'submit form': function(event, template){
    event.preventDefault();

    // new url
    var post = {
      url: $('input[name=new-post]').val()
    };

    /*
    * Validate Duplicates
    * - In context: Group or Profile
    */
    var errors = {};

    // Groups
    if(_.isUndefined(template.data.username)) {
      var groupId = template.data._id;
      if(Posts.findOne({url: post.url, groupIds: {$in: [groupId]}})) {
        errors.exists = 'This post already exists in this group.';
      }
    }
    // Profiles
    else {
      var userId = Meteor.userId();
      if(Posts.findOne({authorId: userId, url: post.url, groupIds: {$exists: false}})) {
        errors.exists = 'This post already exists on your profile.';
      }
    }

    //
    if(!_.isEmpty(errors)) {
      return alert(errors.exists);
    }
    else {
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
    }
  },
});
