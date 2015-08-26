Invites = new Mongo.Collection('invites');

Invites.attachSchema(new SimpleSchema({

  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },

  token: {
    type: String,
    optional: true
  },

  used: {
    type: String,
    optional: true
  },

  createdAt: {
    type: Date,
    autoValue: function(doc) {
      if (Meteor.isServer && this.isInsert) {
          return new Date();
      }
    },
  }
}));
