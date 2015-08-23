
Meteor.methods({
  addPost: function(post) {
    check(post, {
      url: String
    });

    // check for duplicates
    var exists = Posts.findOne({url: post.url});
    if(exists) {
      throw new Meteor.Error('already-exists', 'Looks like this link already exists');
    }

    /*
    * Check Type
    */
    var ytRegex = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/; // YouTube
    var scRegex = /((https:\/\/)|(http:\/\/)|(www.)|(\s))+(soundcloud.com\/)+[a-zA-Z0-9\-\.]+(\/)+[a-zA-Z0-9\-\.]+/; // SoundCloud
    var spotifyRegex = /((http:\/\/(open\.spotify\.com\/.*|spoti\.fi\/.*|play\.spotify\.com\/.*))|(https:\/\/(open\.spotify\.com\/.*|play\.spotify\.com\/.*)))/i; // Spotify

    if(ytRegex.test(post.url)) {
      post.type = 'youtube';
    }

    else if(scRegex.test(post.url)) {
      post.type = 'soundcloud';
    }

    else if(spotifyRegex.test(post.url)) {
      post.type = 'spotify';
    }

    else {
      throw new Meteor.Error('invalid-link', 'Sorry, only supports YouTube, SoundCloud and Spotify links');
    }

    // Get Embed (oEmbed)
    Meteor.call('getEmbed', post);

    // Add author id
    post.authorId = Meteor.userId();

    //////
    var postId = Posts.insert(post, function(error, result) {
      if(error) {
          throw new Meteor.Error(error);
        }
      });

      return postId;
    },

    getEmbed: function(post) {
      check(post, {
        url: String,
        type: String
      });

      var embedUrl;

      switch (post.type) {
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
          url: post.url
        },
        headers: {
          'User-Agent': 'chrome'
        }
      }, function(error, result) {
        Posts.update({url: post.url}, {
          $set: {
            html: result.data.html
          }
        });
      });
  },

  deletePost: function(postId) {
    check(postId, String);

    var post = Posts.findOne(postId);

    // is owner
    if(Meteor.userId() === post.authorId) {
      Posts.remove(postId);
    }
  }
});
