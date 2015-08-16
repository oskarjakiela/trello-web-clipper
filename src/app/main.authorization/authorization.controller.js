(function() {
  'use strict';

  angular
    .module('twc')
    .controller('AuthorizationController', AuthorizationController);

  /** @ngInject */
  function AuthorizationController($addon, manifest, properties, Trello) {
    var vm = this;

    vm.expiration = properties.defaults.expiration;
    vm.expirations = properties.expirations;
    vm.logIn = logIn;

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
          // actually it calls only in Firefox
          $addon.storage({
            token: Trello.token()
          });
        }
      });
    }
  }
})();
