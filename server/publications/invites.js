Meteor.publish('allInvites', function() {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
   return Invites.find();
 } else {
   this.stop();
   return;
 }
});
