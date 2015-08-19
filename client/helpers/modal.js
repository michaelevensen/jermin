Modal = {};
Modal.open = function(template, options) {
  // options for data context
  // need to set {data: dataContext}
  options = options || {};

  var overlay = document.createElement('div');
  var $overlay = $(overlay);
  $overlay.addClass('overlay');

  var lightbox = document.createElement('div');
  var $lightbox = $(lightbox);
  $lightbox.addClass('lightbox');

  // add lightbox to overlay
  $overlay.append(lightbox);

  // render
  overlay.view = Blaze.renderWithData(Template[template], options.data, lightbox);

  // append
  $('body').append(overlay);

  $overlay.click(function(e) {
    if(e.target==this) {
      Modal.close(overlay);
    }
  });
  return overlay;
};

// If you're closing a specific element refer to it with it's classname. eg. '.login' not 'login'
Modal.close = function(element) {
  var $overlay = $(element).closest('.overlay');

  if(!$overlay || !$overlay.get() || !$overlay.get()[0]) return;

  var overlayDiv = $overlay.get()[0];

  // remove
  Blaze.remove(overlayDiv.view);
  $overlay.remove();
};

Modal.closeAll = function() {
  $('.overlay').each(function() {
    Modal.close(this);
  });
};
