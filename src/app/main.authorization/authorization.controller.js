(function() {
  'use strict';

  angular
    .module('oj.trelloWebClipper')
    .controller('AuthorizationController', AuthorizationController);

  /** @ngInject */
  function AuthorizationController($log, $addon, properties, $state, Trello) {
    var vm = this;

    vm.expiration = properties.defaults.expiration;
    vm.expirations = properties.expirations;
    vm.logIn = logIn;

    function logIn() {
      Trello.authorize({
        name: $addon.pkg.title,
        type: 'popup',
        scope: {
          read: true,
          write: true,
          account: false
        },
        expiration: vm.expiration,
        success: function() {
          $addon.storage.save('token', Trello.token());
          $state.go('main', {}, { reload: true });
        }
      });
    }
  }
})();
