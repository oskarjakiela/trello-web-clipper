(function() {
  'use strict';

  angular
    .module('twc')
    .controller('SettingsController', SettingsController);

  /** @ngInject */
  function SettingsController($log, $addon, $state, storage, Trello) {
    $log.info('SettingsController');

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
      }).then(function() {
        $state.go('main.clipping');
      });
    }

    function logOut() {
      Trello.deauthorize();
      $addon.logOut().then(function() {
        $state.go('main.authorization');
      });
    }
  }
})();
