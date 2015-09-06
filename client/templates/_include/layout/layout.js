Template.layout.onRendered(function() {

  /*
  * Header Actions
  * - Reactive Query Params
  */
  var instance =  Template.instance();
  instance.autorun(function() {
    if(FlowRouter.getQueryParam('action')) {
      var action = FlowRouter.getQueryParam('action');
      var callback = function() {
        FlowRouter.setQueryParams({action: null, token: null});
      };

      // check for token
      if(FlowRouter.getQueryParam('token')) {
        var token = FlowRouter.getQueryParam('token');

        // open register with token
        Modal.open('register', {data: {token: token}}, callback);
      }
      else {
        Modal.open(action, callback);
      }
    }
  });
});
