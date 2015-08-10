(function() {
  'use strict';

  angular
    .module('twc')
    .factory('$addon', $addon);

  /** @ngInject */
  function $addon($firefox, $mock, self) {
    if (angular.isUndefined(self.port)) {
      return $mock;
    }

    return $firefox;
  }
})();
