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
    type: Boolean,
    defaultValue: false
  },

  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  }
}));
