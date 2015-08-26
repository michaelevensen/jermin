
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
    * Get embed (oEmbed)
    */
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
        sourceType: String
      });

      var embedUrl;

      switch (post.sourceType) {
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
        if(error) {
          throw new Meteor.Error(error);
        }
        else if(result) {
          // update with iframe html
          Posts.update({url: post.url}, {
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

  deletePost: function(postId) {
    check(postId, String);

    var post = Posts.findOne(postId);

    // is owner
    if(Meteor.userId() === post.authorId) {
      Posts.remove(postId);
    }
  },

  isFeatured: function(postId, state) {
    check(postId, String);
    check(state, Boolean);

    // double-check admin
    if(Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Posts.update(postId, {$set: {
        'isFeatured': state
      }});
    } else {
      throw new Meteor.Error('no-permissions', "You don't have permission to do this.");
    }
  }
});
