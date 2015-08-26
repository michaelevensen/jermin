
Posts = new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({

  // from source
  title: {
    type: String,
    optional: true
  },

  author_name: {
    type: String,
    optional: true
  },

  mediaType: {
    type: String,
    optional: true
  },

  url: {
    type: String,
    // regEx: SimpleSchema.RegEx.Url
  },

  authorId: {
    type: String
  },

  html: {
    type: String,
    optional: true
  },

  isFeatured: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },

  sourceType: {
    type: String
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
