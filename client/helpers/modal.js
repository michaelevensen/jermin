Modal = {};
Modal.open = function(template, options, callback) {
  // options for data context
  // need to set {data: dataContext}
  if(arguments.length === 2 && typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  callback = callback || options.callback;

  // create elements
  var overlay = document.createElement('div');
  var $overlay = $(overlay);
  $overlay.addClass('overlay');

  var lightbox = document.createElement('div');
  var $lightbox = $(lightbox);
  $lightbox.addClass('lightbox');

  // append
  $overlay.append(lightbox);

  // render
  overlay.view = Blaze.renderWithData(Template[template], options.data, lightbox);
  overlay.__callback = callback;

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
Modal.close = function(element, error, data) {
  var $overlay = $(element).closest('.overlay');
  if(!$overlay || !$overlay.get() || !$overlay.get()[0]) return;
  var overlayDiv = $overlay.get()[0];

  /* Callback */
  if(overlayDiv.__callback) {
    overlayDiv.__callback(error, data);
  }

  /* Destroy */
  Blaze.remove(overlayDiv.view);
  $overlay.remove();
};

Modal.closeAll = function() {
  $('.overlay').each(function() {
    Modal.close(this);
  });
};
