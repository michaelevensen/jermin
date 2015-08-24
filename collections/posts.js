
Posts = new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({

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

  type: {
    type: String
  },

  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  }
}));
