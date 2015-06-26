define(
  [
    'jquery',
    'underscore',
    'templates'
  ],
  function(jQuery, _, templates){
    var app = app || {};

    app.init = function() {
      jQuery("body").append(templates["app.html"]());
    };

    return app;

});
