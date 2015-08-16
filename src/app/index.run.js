(function() {
  'use strict';

  angular
    .module('twc')
    .run(runBlock);

  /** @ngInject */
  function runBlock($addon, $state) {
    // refresh app in firefox on show popup
    $addon.popup.on('show', function() {
      $state.go('main', {}, { reload: true });
    });
  }

})();
