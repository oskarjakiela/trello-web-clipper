(function() {
  'use strict';

  angular
    .module('twc')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $addon, $rootScope, $state, Trello) {
    $log.info('runBlock');

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      $log.error('$stateChangeError', error);
    });

    $addon.on('$addon:popup:hide', function() {
      if (! Trello.authorized()) { return; }
      $state.go('main.clipping');
    });
  }

})();
