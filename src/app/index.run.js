(function() {
  'use strict';

  angular
    .module('twc')
    .run(runBlock);

  /** @ngInject */
  function runBlock($addon, $state) {
    $addon.popup.on('show', function() {
      $state.go('main', {}, { reload: true });
    });
  }

})();
