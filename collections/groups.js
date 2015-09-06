
Groups = new Mongo.Collection('groups');

// friendly slugs from 'name'
Groups.friendlySlugs();

Groups.attachSchema(new SimpleSchema({

  name: {
    type: String
  },

  description: {
    type: String,
    optional: true
  },

  authorId: {
    type: String
  },

  // users apart of the group
  memberIds: {
    type: [String]
  },

  // posts
  postIds: {
    type: [String],
    optional: true
  },

  isPrivate: {
    type: Boolean,
    defaultValue: false
  },

  createdAt: {
    type: Date,
    autoValue: function(doc) {
      if (Meteor.isServer && this.isInsert) {
          return new Date();
      }
    },
  },

  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        return new Date();
      }
    }
  },
}));
