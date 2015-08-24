Meteor.methods({
  validateToken: function(email, token){
    check(email, String);
    check(token, String);

    // check invite
    var invite = Invites.findOne({email: email, token: token});

    if(invite.used) {
      throw new Meteor.Error("used-token", "Sorry, this token has already been used.");
    }

    else if(!invite) {
      throw new Meteor.Error("invalid-token", "Something's wrong with your invite token, please double check.");
    }

    else {
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
            urlWithToken: url + '?register=token'
          }),
          html: Handlebars.templates['invite-html']({
            urlWithToken: url + '?register=token'
          })
        });
      }
    });
  }
});
