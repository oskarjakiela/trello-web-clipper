(function() {
  'use strict';

  angular
    .module('twc')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(options, $rootScope, $state, storage, Trello) {
    Trello.setKey(options.key);
    Trello.setToken(storage.token);

    if (Trello.authorized()) {
      $state.go('main.clipping');
    } else {
      $state.go('main.authorization');
    }

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      if (error.status === 401) {
        Trello.deauthorize();
        $state.go('main.authorization');
      }

      $state.go('main.error');
    });
  }
})();
