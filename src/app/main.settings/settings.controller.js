(function() {
  'use strict';

  angular
    .module('twc')
    .controller('SettingsController', SettingsController);

  /** @ngInject */
  function SettingsController($addon, $state, storage, Trello) {
    var vm = this;

    vm.options = {};
    vm.options.apiKey = storage['options.apiKey'];
    vm.options.template = storage['options.template'];

    vm.logOut = logOut;
    vm.save = save;

    function save(options) {
      $addon.storage({
        'options.apiKey': options.apiKey,
        'options.template': options.template
      });
      $state.go('main.clipping');
    }

    function logOut() {
      Trello.deauthorize();
      $addon.logOut();
      $state.go('main.authorization');
    }
  }
})();
