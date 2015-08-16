/* global Trello: false */

(function() {
  'use strict';

  var chrome = 'chrome' in window ? window.chrome : undefined;
  var firefox = self && 'port' in self ? self : undefined;

  angular
    .module('twc')
    .constant('chrome', chrome)
    .constant('firefox', firefox)
    .constant('Trello', Trello);

})();
