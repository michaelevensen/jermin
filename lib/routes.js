var subs = new SubsManager();

/*
* Index
*/
FlowRouter.route('/', {
  name: 'index',
  action: function() {
    BlazeLayout.render('layout', {main: 'index'});
  }
});

/*
* Not Found
*/
FlowRouter.notFound = {
  action: function() {
    FlowRouter.go('index');
  }
};
