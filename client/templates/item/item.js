Template.item.events({
  "click .delete": function(event, template){
    event.preventDefault();

    if(confirm('You sure?')) {
      var postId = this._id;

      // delete
      Meteor.call('deletePost', this._id, function(error, result) {
        if(error)
          alert(error);
      });
    }
  }
});

Template.item.helpers({
  authorName: function() {
    return Meteor.users.findOne(this.authorId).username;
  },
  isOwner: function(){
    return Meteor.userId() === this.authorId;
  },
  isAdmin: function() {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  isFeatured: function() {
    return this.isFeatured ? 'checked' : '';
  }
});
