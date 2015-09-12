
Meteor.methods({
  addPost: function(post) {
    check(post, {
      url: String
    });

    // Add author
    post.authorId = Meteor.userId();

    /*
    * Check Link Type
    */
    var ytRegex = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/; // YouTube
    var scRegex = /((https:\/\/)|(http:\/\/)|(www.)|(\s))+(soundcloud.com\/)+[a-zA-Z0-9\-\.]+(\/)+[a-zA-Z0-9\-\.]+/; // SoundCloud
    var spotifyRegex = /((http:\/\/(open\.spotify\.com\/.*|spoti\.fi\/.*|play\.spotify\.com\/.*))|(https:\/\/(open\.spotify\.com\/.*|play\.spotify\.com\/.*)))/i; // Spotify

    if(ytRegex.test(post.url)) {
      post.sourceType = 'youtube';
    }

    else if(scRegex.test(post.url)) {
      post.sourceType = 'soundcloud';
    }

    else if(spotifyRegex.test(post.url)) {
      post.sourceType = 'spotify';
    }

    else {
      throw new Meteor.Error('invalid-link', 'Sorry, only supports YouTube, SoundCloud and Spotify links');
    }

    /*
    * Add post
    */
    var postId = Posts.insert(post, function(error, result) {
      if(error) {
          throw new Meteor.Error(error);
        }
        if(result) {
          /*
          * Get embed (oEmbed)
          */
          Meteor.call('getEmbed', result, post.url, post.sourceType);
      }
    });

    // return document
    return postId;
  },

  getEmbed: function(postId, sourceUrl, sourceType) {
    check(postId, String);
    check(sourceUrl, String);
    check(sourceType, String);

    var embedUrl;

    switch (sourceType) {
      case 'youtube':
        embedUrl = 'http://www.youtube.com/oembed';
      break;

      case 'soundcloud':
        embedUrl = 'http://soundcloud.com/oembed';
      break;

      case 'spotify':
        embedUrl = 'https://embed.spotify.com/oembed';
      break;
    }

    HTTP.call('GET', embedUrl, {
      params: {
        format: 'json',
        url: sourceUrl
      },
      headers: {
        'User-Agent': 'chrome'
      }
    }, function(error, result) {
      if(error) {
        throw new Meteor.Error(error);
      }
      if(result) {
        // update with iframe html
        Posts.update(postId, {
          $set: {
            title: result.data.title,
            author_name: result.data.author_name,
            mediaType: result.data.type,
            html: result.data.html
          }
        });
      }
    });
  },

  checkForDuplicate: function(post) {
    check(post, {
      url: String
    });




    return true;
  },

  deletePost: function(postId) {
    check(postId, String);
    var post = Posts.findOne(postId);

    // is owner or admin
    if(Meteor.userId() === post.authorId || Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Posts.remove(postId);
    } else {
      throw new Meteor.Error('no-permission', "You don't have permission to do this.");
    }
  },

  setPostFeatured: function(postId, state) {
    check(postId, String);
    check(state, Boolean);

    console.log('post featured!');

    // double-check admin
    if(Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Posts.update(postId, {$set: {
        'isFeatured': state
      }});
    } else {
      throw new Meteor.Error('no-permission', "You don't have permission to do this.");
    }
  },

  setPostPrivate: function(postId, state) {
    check(postId, String);
    check(state, Boolean);

    var authorId = Meteor.userId();
    var post = Posts.findOne(postId);

    // is owner
    if(post.authorId===authorId) {
      Posts.update(postId, {$set: {
        'isPrivate': state
      }});
    } else {
      throw new Meteor.Error('no-permission', "You don't have permission to do this.");
    }
  }
});
