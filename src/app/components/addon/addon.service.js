(function() {
  'use strict';

  angular
    .module('twc')
    .factory('$addon', $addon);

  /** @ngInject */
  function $addon(chrome, $chrome, firefox, $firefox, $mock) {
    if (chrome) {
      return $chrome;
    }

    if (firefox) {
      return $firefox;
    }

    return $mock;
  }
})();
