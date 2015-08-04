(function() {
  'use strict';

  angular
    .module('oj.trelloWebClipper')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $addon, $state, Trello) {
    $addon.prefs.onChange(function() {
      Trello.setKey($addon.prefs.key);
    });

    $addon.storage.onChange(function() {
      Trello.setToken($addon.storage.token);
      $state.go('main', {}, { reload: true });
    });
  }

})();
