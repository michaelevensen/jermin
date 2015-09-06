
Template.item.events({
  'click .delete-post': function(event, template) {
    event.preventDefault();

    if(confirm('You sure?')) {
      var postId = this._id;

      // delete from group
      if(this.groupId) {
        var groupId = this.groupId;
      }

      // delete
      Meteor.call('deletePost', postId, function(error, result) {
        if(error) {
          return alert(error);
        }

        if(groupId) {
          // remove from group
          Meteor.call('removePostFromGroup', postId, groupId);
        }
      });
    }
  },

  'click .is-private': function(event, template) {
    event.preventDefault();

    // post id
    var postId = this._id;
    var state = this.isPrivate ? false : true;

    // set to private
    Meteor.call('setPostPrivate', postId, state, function(error, result) {
      if(error)
        alert(error);
    });
  },

  'click input[name=featured]': function(event, template) {
    event.preventDefault();

    // post id
    var postId = this._id;
    var state = this.isFeatured ? false : true;

    // featured
    Meteor.call('setPostFeatured', postId, state, function(error, result) {
      if(error)
        alert(error);
    });
  }
});

Template.item.helpers({
  authorName: function() {
    var user = Meteor.users.findOne(this.authorId, {fields: {
      'username': 1
    }});
    if(user) {
      return user.username;
    }
  },
  isOwner: function(){
    return Meteor.userId() === this.authorId || Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  isAdmin: function() {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  featured: function() {
    return this.isFeatured ? 'checked' : '';
  },
  private: function() {
    return this.isPrivate ? 'checked' : '';
  }
});
