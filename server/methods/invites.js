Meteor.methods({
  validateToken: function(token) {
    check(token, String);

    // check invite
    var invite = Invites.findOne({token: token});

    if(invite.used) {
      throw new Meteor.Error("used-token", "Sorry, this token has already been used.");
    }

    else if(!invite) {
      throw new Meteor.Error("invalid-token", "Something's wrong with your invite token, please double check.");
    }

    else {
      // good to go
      return true;
    }
  },

  sendInvite: function(email, url) {
    check(email, String);
    check(url, String);

    // generate token (based on Random)
    var token = Random.hexString(10);

    // create invite
    var invitee = {
      email: email,
      token: token
    };

    var inviteId = Invites.insert(invitee, function(error, result) {
      if(error) {
        throw new Meteor.Error(error.sanitizedError.error, error.message);
      }

      if(result) {
        // Send Invitation
        Email.send({
          to: email,
          from: "Rave <hello@rave.io>",
          subject: "Your invite to Rave",
          text: Handlebars.templates['invite-text']({
            urlWithToken: url + '?action=register&token=' + token
          }),
          html: Handlebars.templates['invite-html']({
            urlWithToken: url + '?action=register&token=' + token
          })
        });
      }
    });
  },

  useInvite: function(token) {
    check(token, String);

    // set token to used (with current user-id)
    Invites.update({token: token}, {$set: {
      'used': Meteor.userId()
    }});
  }
});
