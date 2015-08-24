// Interface helpers
Template.registerHelper('epochToString', function(timestamp) {
	return moment.unix(timestamp / 1000).format("MMMM Do, YYYY");
});

Template.registerHelper('timeAgo', function(datetime) {
  return moment(datetime).fromNow();
});

Template.registerHelper('niceDate', function(datetime) {
  return moment(datetime).format("MMMM Do, YYYY");
});

// Not True | False but "Yes" | "No"
Template.registerHelper('readableBoolean', function(bool){
	return (bool ? "Yes" : "No");
});
