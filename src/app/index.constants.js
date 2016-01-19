/* global _: false, Trello: false */

(function() {
  'use strict';

  var chrome = 'chrome' in window ? window.chrome : undefined;
  var firefox = self && 'port' in self ? self : undefined;

  angular
    .module('twc')
    .constant('_', _)
    .constant('apiKey', 'e8b6ba838382302e68e9ad90a139bc7a')
    .constant('chrome', chrome)
    .constant('firefox', firefox)
    .constant('Trello', Trello);

})();
