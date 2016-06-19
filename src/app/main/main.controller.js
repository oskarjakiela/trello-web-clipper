(function() {
  'use strict';

  angular
    .module('twc')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $addon, $rootScope, $state, storage, token, Trello) {
    $log.info('MainController');

    Trello.setKey(storage['options.apiKey']);
    Trello.setToken(token);

    if (Trello.authorized()) {
      $state.go('main.clipping');
    } else {
      $state.go('main.authorization');
    }

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      if (error.status === 401) {
        Trello.deauthorize();
        $addon.reset();
        $state.go('main.authorization');
        return;
      }

      $state.go('main.error');
    });
  }
})();
