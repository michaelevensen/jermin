
Meteor.users.attachSchema(new SimpleSchema({

	_id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },

  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/
  },

  services: {
    type: Object,
    optional: true,
    blackbox: true
  },

  // PostIds
  // For displaying and filtering your profile posts.
  postIds: {
    type: [String],
    optional: true
  },

  // Add `roles` to your schema if you use the meteor-roles package.
  // Option 1: Object type
  // If you specify that type as Object, you must also specify the
  // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
  // Example:
  // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
  // You can't mix and match adding with and without a group since
  // you will fail validation in some cases.
  roles: {
      type: Object,
      optional: true,
      blackbox: true
  },

	updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        return new Date();
      }
    }
  },

  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  }
}));
