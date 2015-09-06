
Posts = new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({

  title: {
    type: String,
    optional: true
  },

  isPrivate: {
    type: Boolean,
    defaultValue: false
  },

  // array of group ids post belong to
  groupIds: {
    type: [String],
    optional: true
  },

  // from youtube oEmbed not username
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
