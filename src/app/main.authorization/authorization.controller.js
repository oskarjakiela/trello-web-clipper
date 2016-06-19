(function() {
  'use strict';

  angular
    .module('twc')
    .controller('AuthorizationController', AuthorizationController);

  /** @ngInject */
  function AuthorizationController($log, $addon, manifest, properties, $state, Trello) {
    $log.info('AuthorizationController');

    var vm = this;

    vm.expiration = properties.defaults.expiration;
    vm.expirations = properties.expirations;
    vm.logIn = logIn;

    if (Trello.authorized()) {
      $state.go('main');
    }

    function logIn() {
      Trello.authorize({
        name: manifest.title,
        type: 'popup',
        scope: {
          read: true,
          write: true,
          account: false
        },
        expiration: vm.expiration,
        success: function() {
          $addon.token(Trello.token()).then(function() {
            $state.go('main', {}, { reload: true });
          });
        }
      });
    }
  }
})();
